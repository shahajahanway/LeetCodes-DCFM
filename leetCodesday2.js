// Leetcode 2894 – Divisible and Non-divisible Sums Difference
// We need to > Sum all numbers from 1 to n
// If divisible by m, add to num2
// Else, add to num1
// Return num1 - num2


/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var differenceOfSums = function(n, m) {
    let num1 = 0;
    let num2 = 0;

    for (let i = 1; i <= n; i++) {
        if (i % m === 0) {
            num2 += i;
        } else {
            num1 += i;
        }
    }

    return num1 - num2;
};


// Explanation > num1 = 1+2+4+5+7+8+10 = 37

// num2 = 3+6+9 = 18

// 37 - 18 = 19 
