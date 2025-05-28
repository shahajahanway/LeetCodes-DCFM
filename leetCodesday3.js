// LeetCode Day 3 — Tree + DFS + Optimization
// Problem: 3372. Maximize the Number of Target Nodes After Connecting Trees I
// Difficulty: Medium

/**
 * 🎯 Real-Life Analogy:
 * Imagine you are at two different parks (trees), and you can only walk k steps.
 * You want to connect any tree from the first park to any tree in the second park,
 * and then see how many trees you can visit within k steps total.
 * 
 * Think of it like connecting two islands with a bridge and then exploring from each island
 * to the other. The bridge uses up one of your allowed steps.
 * 
 * Memory Trick: 
 * - DFS (Depth-First Search) is like a curious child exploring every branch of a tree before coming back.
 * - count1[i] is "how far can I go from tree1[i] in k steps"
 * - count2[j] is "how far can I go from tree2[j] in k-1 steps" (since 1 step is used to connect)
 * - Best case is always: count1[i] + max(count2)
 */

var maxTargetNodes = function (edges1, edges2, k) {
    // DFS function to count reachable nodes from 'node' within distance 'k'
    const dfs = (node, parent, children, k) => {
        if (k < 0) return 0;
        let res = 1; // include the current node
        for (const child of children[node]) {
            if (child === parent) continue;
            res += dfs(child, node, children, k - 1);
        }
        return res;
    };

    // Build the tree and calculate counts for all nodes
    const build = (edges, k) => {
        const n = edges.length + 1;
        const children = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            children[u].push(v);
            children[v].push(u);
        }
        const res = Array(n);
        for (let i = 0; i < n; i++) {
            res[i] = dfs(i, -1, children, k);
        }
        return res;
    };

    const n = edges1.length + 1;
    const count1 = build(edges1, k);         // From tree 1
    const count2 = build(edges2, k - 1);     // From tree 2 (1 step goes to connection)
    const maxCount2 = Math.max(...count2);   // Best connection node in tree 2

    return count1.map(count => count + maxCount2);
};

// 🧪 Example Test:
console.log(
  maxTargetNodes(
    [[0,1],[0,2],[2,3],[2,4]],
    [[0,1],[0,2],[0,3],[2,7],[1,4],[4,5],[4,6]],
    2
  )
); // Output: [9, 7, 9, 8, 8]

// 🌱 Tip: Use this to practice tree traversal, DFS, and how to combine trees smartly.
