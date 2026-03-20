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

console.log(merge([-5, -2, 4, 5], [-3, 1, 8]));