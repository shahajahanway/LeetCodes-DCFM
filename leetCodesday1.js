// Leetcode 1857 – Largest Color Value in a Directed Graph, we need to
// 🧠 Problem Summary >  A directed graph with n nodes (0 to n−1)
// A string colors where colors[i] = color of node i
// An edge list edges[i] = [u, v] means a directed edge from u → v
// 🎯 Goal > Find the maximum frequency of a single color on any valid path . If the graph contains a cycle, return -1
// ✅ Strategy:
// This is a topological sort + dynamic programming on a DAG (Directed Acyclic Graph) problem.
// Key Steps > Build the graph (adjacency list + in-degree array) .Topologically sort using Kahn’s Algorithm (BFS-based)
// Track color counts using a 2D DP table > dp[node][c] = max count of color c along any path ending at node
// If a cycle is detected (i.e., not all nodes are visited), return -1
// Otherwise, return the maximum value in dp


/**
 * @param {string} colors
 * @param {number[][]} edges
 * @return {number}
 */
var largestPathValue = function(colors, edges) {
    const n = colors.length;
    const graph = Array.from({ length: n }, () => []);
    const indegree = Array(n).fill(0);

    for (const [u, v] of edges) {
        graph[u].push(v);
        indegree[v]++;
    }

    const queue = [];
    const dp = Array.from({ length: n }, () => Array(26).fill(0));

    // Enqueue all nodes with indegree 0
    for (let i = 0; i < n; i++) {
        if (indegree[i] === 0) queue.push(i);
    }

    let visited = 0;
    let maxColor = 0;

    while (queue.length > 0) {
        const node = queue.shift();
        visited++;

        const colorIndex = colors.charCodeAt(node) - 97;
        dp[node][colorIndex]++;
        maxColor = Math.max(maxColor, dp[node][colorIndex]);

        for (const neighbor of graph[node]) {
            for (let c = 0; c < 26; c++) {
                dp[neighbor][c] = Math.max(dp[neighbor][c], dp[node][c]);
            }

            indegree[neighbor]--;
            if (indegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    // If we didn’t visit all nodes → cycle
    return visited === n ? maxColor : -1;
};

// ⏱️ Time & Space Complexity:
// Time: O(n + m + 26n) → Efficient for n, m ≤ 1e5
// Space: O(n + m + 26n)


