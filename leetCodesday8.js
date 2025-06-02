/**
 * 🔥 Day 8: LeetCode 135 - Candy
 * Difficulty: Hard
 *
 * 🧠 Problem Summary:
 * You are given an array `ratings` representing each child's rating.
 * You must give candies to children such that:
 *  1. Each child gets at least 1 candy.
 *  2. A child with a higher rating than their neighbor gets more candies.
 *
 * Goal: Return the minimum number of candies needed to satisfy these conditions.
 *
 * Example 1:
 * Input: [1, 0, 2]
 * Output: 5
 * Explanation: [2,1,2] ➜ total = 5
 *
 * Example 2:
 * Input: [1, 2, 2]
 * Output: 4
 * Explanation: [1,2,1] ➜ total = 4
 */

/**
 * 🎯 Real-Life Analogy:
 * Imagine you're the teacher in charge of a prize ceremony at school.
 * Each child gets at least 1 candy 🎁
 * But if a child scores higher than their neighbor, they must get **more candies**.
 *
 * So you first walk ➡️ Left to Right giving more candies where needed.
 * Then walk ⬅️ Right to Left to fix any unfair distributions from the other side.
 */

/**
 * 🪄 Memory Trick:
 * Think of it as 2 judges scoring each student.
 * - First judge looks from left ➡️ right.
 * - Second judge looks from right ⬅️ left.
 * Each judge gives scores (candies) based on what they see.
 * The final candy = max(score from both judges).
 */

var candy = function(ratings) {
    const n = ratings.length;
    const candies = new Array(n).fill(1); 

    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }

    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }

    return candies.reduce((sum, c) => sum + c, 0);
};

// 🧪 Test Cases
console.log(candy([1, 0, 2]));  
console.log(candy([1, 2, 2]));     
console.log(candy([1,3,4,5,2]));   
