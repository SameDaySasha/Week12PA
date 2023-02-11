function findPeak(matrix) {
    let highest = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let k = 0; k < matrix[0].length; k++) {
            if (matrix[i][k] > highest) {
                highest = matrix[i][k];
            }
        }
    }

    return highest;
}

function findStarts(matrix) {
    let starts = [];

    // Top Row
    for (let i = 0; i < matrix[0].length; i++) {
        if (matrix[0][i] == 0) {
            starts.push([0, i])
        }
    }

    // Bottom Row
    for (let i = 0; i < matrix[matrix.length-1].length; i++) {
        if (matrix[matrix.length-1][i] == 0) {
            starts.push([matrix.length-1, i])
        }
    }

    // Left except first and last
    for (let i = 1; i < matrix.length-1; i++) {
        if (matrix[i][0] == 0) {
            starts.push([i, 0])
        }
    }

    // Right except first and last
    for (let i = 1; i < matrix.length - 1; i++) {
        if (matrix[i][matrix[0].length - 1] == 0) {
            starts.push([i, matrix[0].length-1])
        }
    }

    return starts;
}

function findNeighbors(node, matrix) {
    let neighbors = [];
    let row = node[0];
    let col = node[1];
    let val = matrix[row][col]
    //console.log("row:", row, "col:", col)

    // Check North
    if (row > 0) {

        let north = matrix[row - 1][col]
        if (Math.abs(north - val) <=1){
        neighbors.push([row-1, col]);}
    }
    // NorthWest
    if (row > 0 && col > 0) {

        let northWest = matrix[row - 1][col-1]
        if (Math.abs(northWest - val) <= 1){
        neighbors.push([row - 1, col-1]);
    }}
    //NorthEast
    if (row > 0 && col < matrix[0].length) {

        let northEast = matrix[row - 1][col+1]
        if (northEast === val||northEast === val -1 ||northEast === val +1){
        neighbors.push([row - 1, col+1]);
    }}

    // Check South
    if (row < matrix.length - 1) {

        let south =matrix[row + 1][col]
        if (south === val||south === val -1 ||south=== val +1){
        neighbors.push([row+1, col]);
    }}
    //SouthWest
    if (row < matrix.length - 1 && col > 0) {

        let southWest =matrix[row + 1][col-1]
        if (southWest === val||southWest === val -1 ||southWest === val +1){
        neighbors.push([row + 1,col-1]);
    }}
    //SouthEast
    if (row < matrix.length - 1 && matrix[0].length -1) {

        let southEast = matrix[row + 1][col+1]
        if (southEast === val||southEast === val -1 ||southEast === val +1){
        neighbors.push([row + 1,col+1]);
    }}
    // Check West
    if (col > 0) {

        let west = matrix[row][col - 1]
        if (west === val||west === val -1 ||west=== val +1){
        neighbors.push([row,col - 1]);
    }}

    // Check East
    if (col < matrix[0].length - 1) {
        let east = matrix[row][col + 1]
        if (east === val||east === val -1 ||east === val +1){
        neighbors.push([row,col + 1]);
    }}

/******************Gregs soft of hand Approach ******************/
/*
-- this sets i to be the array[row] before current array[row] and loops to the array[row] after current array[row]--
for (let i = row-1; i <- row +1; i++){
    --if the position is invalid (not an existing location) skip forward --
    if(i < 0 || i >= matrix.length) continue;
    -- j corrolates to index[column]; and loops from previous index[col] to the next index[col]
    for(let j = col -1; j <= col + 1; j++){
        --check that column/index is valid--
        if(j < 0 || j >= matrix[0].length) continue;
        --subtracting the two values[original spot value and nearby spot value], if they are within 1  diffrence of eachother and NOT our original position we place into or neighbors array--
        if(Math.abs(matrix[i][j] - val <= 1) && !(row === i && col === j)) {
            neighbors.push([i,j])
        }
    }
}
*/
    return neighbors;
}


function pathTraversal(node, matrix, visited, peak) {
    let q = [node];
    visited.add(node.toString());

    while(q.length){
        let curr = q.shift();
        let [currRow,currCol] = curr;
        if (matrix[currRow][currCol] === peak) return true;
        let neighbors = findNeighbors(curr, matrix)
        //console.log(neighbors)
        neighbors.forEach((n) => {
            if(!visited.has(n.toString())){
                visited.add(n.toString());
                q.push(n);
            }
        })
    }
    return false
}

function identifyPath(mountain) {
   const peak = findPeak(mountain);

   const starts = findStarts(mountain);

    for(let i = 0; i < starts.length; i++){
        let curStart = starts[i];
        let visited = new Set()
        if(pathTraversal(curStart, mountain,visited, peak))return curStart
    }

}

// Uncomment for local testing

// // Example 0
// const mountain_0 = [
//     [1, 2, 4],
//     [4, 5, 9],
//     [5, 7, 6]
// ];

// console.log(findNeighbors([2,0], mountain_0)) // <- Expect '[ [ 1, 0 ], [ 1, 1 ] ]'

// // Example 1
// const mountain_1 = [
//         [1, 0, 1, 1],
//         [2, 3, 2, 1],
//         [0, 2, 4, 1],
//         [3, 2, 3, 1]
// ];

// test_visited = new Set()
// console.log(pathTraversal([0, 1], mountain_1, test_visited, 4)) // <- Expect 'true
// console.log(identifyPath(mountain_1)) // <- Expect '[ 0, 1 ]'

// // Example 2
// const mountain_2 = [
//         [0, 2, 1, 1],
//         [2, 2, 3, 1],
//         [1, 1, 1, 1],
//         [1, 0, 1, 1]
// ];

// console.log(identifyPath(mountain_2)) // <- Expect '[ 3, 1 ]'

// // Example 3
// const mountain_3 = [
//         [0, 1, 2, 0],
//         [5, 1, 3, 2],
//         [4, 1, 2, 1],
//         [3, 4, 3, 1]
// ];

// console.log(identifyPath(mountain_3)) // <- Expect '[ 0, 0 ]'



/*************DO NOT MODIFY UNDER THIS LINE ***************/

module.exports = [identifyPath, findNeighbors, pathTraversal];
