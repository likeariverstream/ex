function bfs(root, value){
    let start = 0;
    let end = root.length - 1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);

        if (root[middle] === value) {
            // found the key
            return middle;
        } else if (root[middle] < value) {
            // continue searching to the right
            start = middle + 1;
        } else {
            // search searching to the left
            end = middle - 1;
        }
    }
    // key wasn't found
    return -1;
}