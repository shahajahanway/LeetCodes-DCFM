// 🐍 LeetCode Day 6: Problem 909 - Snakes and Ladders
// 🎯 Difficulty: Medium


  // Imagine ek game board hai jahan har cell ek number se label hai (1 se n^2 tak).
  // Tum 1 se start karte ho aur har move me 1 se 6 ka dice roll kar sakte ho.
  // Agar koi snake ya ladder milta hai, toh us par chadh jaate ho ya gir jaate ho.
  // Goal hai: minimum moves me last square tak pahuchna.
  // Yeh ek shortest path problem hai — so BFS best approach hai!
 

/**
 * @param {number[][]} board - n x n game board with snakes/ladders
 * @return {number} - minimum number of dice rolls to reach end
 */
var snakesAndLadders = function(board) {
    const n = board.length;

    // 🧭 Convert 1D label to 2D board coordinates
    const getCoordinates = (s) => {
        let r = Math.floor((s - 1) / n);
        let c = (s - 1) % n;
        // Alternate direction each row (boustrophedon)
        if (r % 2 === 1) c = n - 1 - c;
        return [n - 1 - r, c];
    };

    const visited = new Array(n * n + 1).fill(false);
    const queue = [[1, 0]]; // [position, moves]

    while (queue.length) {
        const [curr, moves] = queue.shift();

        for (let i = 1; i <= 6; i++) {
            let next = curr + i;
            if (next > n * n) continue;

            const [row, col] = getCoordinates(next);
            if (board[row][col] !== -1) {
                next = board[row][col];
            }

            if (next === n * n) return moves + 1;

            if (!visited[next]) {
                visited[next] = true;
                queue.push([next, moves + 1]);
            }
        }
    }

    return -1; 
};
