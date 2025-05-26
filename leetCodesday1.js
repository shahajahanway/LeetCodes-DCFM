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
