// 💻 LeetCode Day 5
// 🔥 Problem: 2359 - Closest Meeting Node
// 🧠 Difficulty: Medium


 //  Socho ek graph hai jahan har node sirf ek hi next node pe ja sakta hai (ya kisi pe nahi).
 //  Tumhare paas do friends hain: ek node1 pe aur ek node2 pe.
 //  Tumhe ek aisi location dhoondhni hai jahan dono pahuch sakein —
 //  jahan dono ki max walking distance minimum ho.
 //  Agar aise multiple options ho, toh sabse chhoti index return karo.


/**
 * @param {number[]} edges - graph edges, -1 means no outgoing edge
 * @param {number} node1 - starting node of first friend
 * @param {number} node2 - starting node of second friend
 * @return {number} - best meeting node index
 */
var closestMeetingNode = function(edges, node1, node2) {
    const n = edges.length;

    // 🔄 BFS-like function to calculate distances from start to reachable nodes
    const getDistances = (start) => {
        const dist = new Array(n).fill(-1);
        let d = 0;
        while (start !== -1 && dist[start] === -1) {
            dist[start] = d++;
            start = edges[start];
        }
        return dist;
    };

    // 📍 Distances from both nodes
    const dist1 = getDistances(node1);
    const dist2 = getDistances(node2);

    let minDist = Infinity;
    let answer = -1;

    // 🔍 Try all common reachable nodes and track min-max distance
    for (let i = 0; i < n; i++) {
        if (dist1[i] !== -1 && dist2[i] !== -1) {
            const maxDist = Math.max(dist1[i], dist2[i]);
            if (maxDist < minDist) {
                minDist = maxDist;
                answer = i;
            }
        }
    }

    return answer;
};
