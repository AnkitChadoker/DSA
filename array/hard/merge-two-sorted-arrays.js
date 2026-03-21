/**
 * we are given two sorted arrays and we need to merge them such that the result is also sorted
 * arr1 = [-5, -2, 4, 5]
 * arr2 = [-3, 1, 8]
 * output = [-5, -3, -2, 1, 4, 5, 8]
**/


                                                    /** DIRECT APPROACH **/

/** we can take pointer (i,j) for each array and and can compare the elements of each array one by one (beacuse both are the sorted arrays) and insert the min. one into the result array and move the pointer ahead of that array. repeast the process till both arrays get exhausted.
 * 
**/
function merge(arr1, arr2) {
    const res = [];
    let i = 0;
    let j = 0;
    const m = arr1.length;
    const n = arr2.length;

    while(i < m && j < n){
        if(arr1[i] <= arr2[j]){
            res.push(arr1[i]);
            i++;
        } else {
            res.push(arr2[j]);
            j++;
        }
    }

    while(i < m){
        res.push(arr1[i]);
        i++;
    }

    while(j < n){
        res.push(arr2[j]);
        j++;
    }

    return res;

    /**
     * TC: O(n + m) 
     * SC: O(n + m) // to solve the problem
     * 
    **/
}

//console.log(merge([-5, -2, 4, 5], [-3, 1, 8]));

                                                        

                                                        /** OPTIMAL APPRAOCH **/
/**
 * we can compare the last element of the first array and first element of second array since arrays are sorted, we know the largest element would be at the last and smallest element would be at first so we are trying to convert both the arrays such that arr1 would have all the smaller elements and arr2 would have all the larger elements that way we can say both arrays are sorted combined and iterate over them one by one to return the sorted array.
 * 
 *  arr1 = [-5, -2, 4, 5]; 
 *  arr2 = [-3, 1, 8];
 * 
 *  compare 5 with -3 since -3 is smaller is should belong to array containing smaller elements and 5 should belong to the array containing large element so we swap both of them and move the pointers ahead on 4 and 1 respectively
 * 
 *  arr1 = [-5, -2, 4, -3]; 
 *  arr2 = [5, 1, 8];
 * 
 * again compare 4 and 1 and again 1 is smaller so we swap them and move the pointers to -2 and 8.
 * 
 *  arr1 = [-5, -2, 1, -3]; 
 *  arr2 = [5, 4, 8];
 * 
 * now coampre -2 and 8, now -2 is smaller meaning they both belong to right arrays, now do we need to check further ?? NO, since we know the arrays are sorted and if at any point we know the elements belongs to the right array the sequential elements automatically belong to the right array. and we can also see that all the smaller elements are in the arr1 and all the greater elements are in the arr2.
 * 
 * now we just sort both the arrays one by one and and we hove our arrays sorted (combinely).
 *
 * arr1 = [-5, -3, -2, 1]
 * arr2 = [4, 5, 8]
 *
 * outout = [-5, -3, -2, 1, 4, 5, 8] 
 *  
**/

function optimalMerge(arr1, arr2){
    let i = arr1.length - 1;
    let j = 0;

    while(i >= 0 && j < arr2.length){
        if(arr1[i] > arr2[j]){
            [arr1[i], arr2[j]] = [arr2[j], arr1[i]];        
            i--;
            j++;
        } else {
            break;
        }
    }

    /** now both the arrays have sorted and relative values, meaning arr2 will be having all the greater value than arr1 that too in sorted fashion and vice-versa. **/
    arr1.sort((a, b) => a - b);
    arr2.sort((a,b) => a - b);

    /** we are using extra space just to return the answer and not solving the problem like above **/
    const arr3 = [];
    for(let i = 0; i < arr1.length; i++){
        arr3.push(arr1[i]);
    }

    for(let i = 0; i < arr2.length; i++){
        arr3.push(arr2[i]);
    }

    return arr3;

    /**
     * TC: O(m + n) + m*logm + n*logn // additional for sorting
     * SC: O(m + n) // just to return the answer specifically and not to solve the problem.
    **/
}

//console.log(optimalMerge([-5, -2, 4, 5], [-3, 1, 8]));


                                                    /** MAIN PROBLEM **/

/**
    You are given two integer arrays arr1 and arr2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in arr1 and arr2 respectively.

    Merge arr1 and arr2 into a single array sorted in non-decreasing order.

    The final sorted array should not be returned by the function, but instead be stored inside the array arr1. To accommodate this, arr1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. arr2 has a length of n.

     
    Example 1:

    Input: arr1 = [1,2,3,0,0,0], m = 3, arr2 = [2,5,6], n = 3
    Output: [1,2,2,3,5,6]
    Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
    The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from arr1.

    Example 2:

    Input: arr1 = [1], m = 1, arr2 = [], n = 0
    Output: [1]
    Explanation: The arrays we are merging are [1] and [].
    The result of the merge is [1].

    Example 3:

    Input: arr1 = [0], m = 0, arr2 = [1], n = 1
    Output: [1]
    Explanation: The arrays we are merging are [] and [1].
    The result of the merge is [1].
    Note that because m = 0, there are no elements in arr1. The 0 is only there to ensure the merge result can fit in arr1.
**/ 

                                                    /** SOLUTION **/

/**
 * we are given two sorted arrays and we need to merge them in-place in the first array itself, becuase there are trailing zeros as well at the end of the first array to accomodate the second array elements.
 * 
 * arr1 = [1,2,3, 0,0,0], arr2 = [2,5,6]
 * i = 2, j = 2, k = 5
 * 
 * we need to accomodate 3 elements from arr2 thats why there are 3 trailing zeros in the arr1 and that will always be the case.
 *  but the original arr1 will be the size of "m" which we need to merge [1,2,3].
 * 
 * What we can do is we know that both arrays are sorted till the valid size. we need to fill those zeros only and obviously those will be at the end so comparitely greater elements would be placed there, this itself clears the approach behind the solution.
 * 
 * we can start comparing both arrays from behind and start placing the larger elements from the last of 0's.
 * 
 * like we compare 3 and 6, since 6 is greater we copy the 6 at the last so our arr1 would become
 *                      
 *                      [1,2,3, 0,0,6]
 * 
 *                      k--; j--; 
 * 
 * and we move the pointer of zeros and the array from which the array was placed in this case it was arr2, meaning we now compare 3 and 5, and again 5 is greater so we copy 5 at the zero pointer.
 *                      
 *                      [1,2,3, 0,5,6]
 * 
 *                      k--; j--;
 * 
 * now we comapre 3 and 2 now this time the 3 is greater which is from arr1, so now the array would be
 * 
 *                      arr1 = [1,2,3, 3,5,6], arr2 = [2,    5,6]
 *                      k--; i--; 
 * 
 * now i (pointer of arr1) is at position 1, k (pointer to represent 0) is at position 2 in the arr1 and j (pointer of arr2) is at position 0 in arr2.
 * 
 * we compare 2 and 2 (i and j) now we can copy any element at the place of k lets say we place from arr1 (i), so we move i pointer as well as k
 *                  
 *                      arr1 = [1,2,2, 3,5,6], arr2 = [2,    5,6]
 *                      k--; i--; 
 * 
 * now i (pointer of arr1) is at position 0, k (pointer to represent 0) is at position 1 in the arr1 and j (pointer of arr2) is at position 0 in arr2.
 * 
 * 
 * we comapre 1 and 2 since clearly 2 is greater so we copy j at the place ok k (though k is already 2 at that position (1)) and move the pointer og j and k.
 * 
 *                      arr1 = [1,2,2, 3,5,6], arr2 = [   2,5,6]
 *                      k--; j--; 
 * 
 * j is exhausted, but if i would have been exhausted first and we would have elements in the j we could just copy those elements at the k place onwards, becuase i represents the arr1 so we do not need to copy paste anything becuase the remaining elements of the arr1 would be on the correct place.
 * 
 * and we can see the arr1 is already sorted.
 *
**/

function mergeInPlace(arr1, m, arr2, n){
    let i = m - 1;
    let j = n - 1;
    let k = m + n - 1;

    while(i >= 0 && j >= 0){
        if(arr2[j] > arr1[i]){
            arr1[k] = arr2[j];
            j--;
        } else {
            arr1[k] = arr1[i];
            i--;
        }
        k--;
    }

    while(j >= 0){
        arr1[k] = arr2[j];
        j--;
        k--;
    }

    return arr1;

    /**
     * TC: O(m + n) // we are iterating over each element at once only.
     * SC: O(1)
    **/
}

console.log(mergeInPlace([-5, -2, 4, 5, 0, 0, 0], 4, [-3, 1, 8], 3));