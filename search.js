const search = (arr, x) => {
    let k = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === x) {
            k = x
            break
        }
    }
    if (!!k) {
        console.log(k)
    } else {
        console.log('Nothing')
    }
}

const barrierSearch = (arr, x) => {
    arr[arr.length] = x
    let i = -1
    while (arr[++i] !== x)
        if (i === arr.length) {
            console.log('Nothing')
        } else {
            console.log(`index: ${i}`)
        }
}

const binarySearch = (arr, x) => {
    let i = 0
    let j = arr.length - 1
    let q = 0
    let k = 0
    do {
        k = (i + j)/2
        if (arr[k] === x) {
            q = 1
        } else  if (arr[k] < x) {
            i = k + 1
        } else {
            j = k - 1
        }
    } while (!q || (i > j))
    if (q) {
        console.log(`Index: ${k}`)
    }
}