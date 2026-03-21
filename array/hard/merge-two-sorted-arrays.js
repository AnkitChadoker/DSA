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
     * SC: O(n + m)
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

console.log(optimalMerge([-5, -2, 4, 5], [-3, 1, 8]));