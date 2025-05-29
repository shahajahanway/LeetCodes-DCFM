// Day 4 - LeetCode Hard Question: 3373
// Problem: Maximize the Number of Target Nodes After Connecting Trees II
// Difficulty: HARD

/**
 * Explanation:
 * You are given two trees. Each node can only talk to another if the number of edges between them is EVEN.
 * For each node in Tree 1, you can connect it to one node in Tree 2. Your task is to maximize how many nodes
 * can be reached (including itself and all even-distance nodes).
 *
 * Real-life Analogy:
 * Think of two villages connected by roads. Villagers only like to meet if the road distance (number of turns)
 * is EVEN. You are allowed to build ONE BRIDGE from any person in village 1 to ANY person in village 2.
 * For every person in village 1, calculate: where should they build the bridge to talk to the maximum people?
 *
 * Memory Trick:
 * EVEN = PEACEFUL path. People at even depth from the root like chatting.
 * Build bridges between similar parity (even-to-even or odd-to-odd) to maximize reach.
 */

// Hindi
// Imagine 2 gaon (villages), har gaon ek tree structure mein bana hai.
// Har node ek aadmi hai, aur har edge ek raasta hai. Agar kisi aadmi se dusre tak even-length ka raasta hai,
// toh wo uska "target" ban sakta hai — matlab dono ek doosre se baat kar sakte hain bina confusion ke.
// Hume har node ke liye batana hai ki agar usse second tree ke kisi node se joda jaye,
// toh maximum kitne log usse "target" ban sakte hain.




/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @return {number[]}
 */
var maxTargetNodes = function (edges1, edges2) {
    function dfs(node, parent, depth, children, color) {
        let res = 1 - (depth % 2); // Count only even depth nodes
        color[node] = depth % 2;  // Track parity: even=0, odd=1
        for (let child of children[node]) {
            if (child !== parent) {
                res += dfs(child, node, depth + 1, children, color);
            }
        }
        return res;
    }

    function build(edges, color) {
        const n = edges.length + 1;
        const children = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            children[u].push(v);
            children[v].push(u);
        }
        const evenCount = dfs(0, -1, 0, children, color);
        return [evenCount, n - evenCount]; // [even count, odd count]
    }

    const n = edges1.length + 1;
    const m = edges2.length + 1;
    const color1 = new Array(n).fill(0);
    const color2 = new Array(m).fill(0);
    const count1 = build(edges1, color1); // [even1, odd1]
    const count2 = build(edges2, color2); // [even2, odd2]

    const res = new Array(n);
    for (let i = 0; i < n; i++) {
        // Try connecting same parity and opposite parity and take the max
        const sameParity = count1[color1[i]] + count2[color1[i]];
        const flipParity = count1[1 - color1[i]] + count2[1 - color1[i]];
        res[i] = Math.max(sameParity, flipParity);
    }
    return res;
};

