
 // * Problem Summary:
 // * You're given several boxes, each possibly:
 // * - Locked/unlocked (`status`)
 // * - Containing candies
 // * - Containing keys to other boxes
 // * - Containing other boxes
 // *
 // * You start with some `initialBoxes`. Open any available boxes, collect candies,
 // * and use found keys and boxes to explore further. Return the **maximum candies** you can collect.

/**
 * Real-Life Analogy:
 * Think of exploring a treasure dungeon 🏰.
 * - Some chests (boxes) are locked 🔒
 * - Some chests have candies 🍬
 * - Some have keys 🔑 to other chests
 * - Some contain other chests 🧳
 * 
 * You explore in **BFS fashion**: pick a chest, open it, gather keys and boxes, and repeat.
 */

/**
 *  Memory Trick:
 * 1. You must **have the box** AND **be able to open it**.
 * 2. Mark boxes as:
 *    - `canOpen`: If you have the key or it's already open
 *    - `hasBox`: If you possess the box physically
 *    - `used`: If you've already opened it
 */

/**
 * @param {number[]} status
 * @param {number[]} candies
 * @param {number[][]} keys
 * @param {number[][]} containedBoxes
 * @param {number[]} initialBoxes
 * @return {number}
 */
var maxCandies = function (
    status,
    candies,
    keys,
    containedBoxes,
    initialBoxes,
) {
    const n = status.length;
    const canOpen = new Array(n).fill(false);
    const hasBox = new Array(n).fill(false);
    const used = new Array(n).fill(false);

    for (let i = 0; i < n; ++i) {
        canOpen[i] = status[i] === 1;
    }
    const q = [];
    let ans = 0;
    for (const box of initialBoxes) {
        hasBox[box] = true;
        if (canOpen[box]) {
            q.push(box);
            used[box] = true;
            ans += candies[box];
        }
    }
    while (q.length > 0) {
        const bigBox = q.shift();
        for (const key of keys[bigBox]) {
            canOpen[key] = true;
            if (!used[key] && hasBox[key]) {
                q.push(key);
                used[key] = true;
                ans += candies[key];
            }
        }
        for (const box of containedBoxes[bigBox]) {
            hasBox[box] = true;
            if (!used[box] && canOpen[box]) {
                q.push(box);
                used[box] = true;
                ans += candies[box];
            }
        }
    }

    return ans;
};
