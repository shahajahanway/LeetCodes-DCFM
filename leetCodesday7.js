/**
 * 🔥 Day 7: LeetCode 2929 - Distribute Candies Among Children II
 * Difficulty: Medium
 *
 * 🧠 Problem Summary:
 * Given `n` candies and a limit per child, how many ways can we distribute candies
 * to 3 children (a, b, c) such that: a + b + c = n and 0 <= a, b, c <= limit
 *
 * Example 1:
 * Input: n = 5, limit = 2
 * Output: 3
 * (Ways: [1,2,2], [2,1,2], [2,2,1])
 *
 * Example 2:
 * Input: n = 3, limit = 3
 * Output: 10
 */

/**
 * 🎯 Real-Life Analogy:
 * Imagine you have n candies and you're the manager of a school event.
 * You want to distribute candies to 3 kids. BUT — no kid can get more than `limit` candies.
 *
 * It's like 3 glasses, each can hold max `limit` candies (no overflow).
 * Your goal is to pour n candies into these 3 glasses without spilling a drop or breaking the max level.
 */

/**
 * 🪄 Memory Trick:
 * Fix the number of candies for 1 child (say Child A = i).
 * Now you're left with (n - i) candies for 2 kids (Child B & C),
 * and you want:
 *      0 <= B <= limit
 *      0 <= C <= limit
 *      B + C = n - i
 * So for each i, count how many pairs of B and C exist in that range!
 */


var distributeCandies = function (n, limit) {
    let ans = 0;
    for (let i = 0; i <= Math.min(limit, n); i++) {
        
        if (n - i > 2 * limit) continue; 
        
        ans += Math.min(n - i, limit) - Math.max(0, n - i - limit) + 1;
    }
    return ans;
};


console.log(distributeCandies(5, 2)); 
console.log(distributeCandies(3, 3)); 
console.log(distributeCandies(1000000, 1000000)); 
