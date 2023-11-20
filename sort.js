const newArray = new Array(3000)
const arr = newArray.map((item) => (Math.random() * 100).toFixed() )
const bubbleSort = (arr) => {
    let x = 0
    let y = 0
    for (let i = 0; i < arr.length; i++) {
        for (let j = arr.length - 1; j > i; j--) {
            console.log(y++)
            x = arr[j - 1]
            arr[j - 1] = arr[j]
            arr[j] = x
        }
    }
}

const shakeSort = (arr) => {
    let l = 1
    let r = arr.length - 1
    let k = arr.length
    let x = 0
    do {
        for (let j = r; r > l; j--) {
            if (arr[j - 1] > arr[j]) {
                x = arr[j - 1]
                arr[j - 1] = arr[j]
                arr[j] = x
                k = j
            }
            l = k + 1
        }
        for (let j = l; j < r; j++) {
            if (arr[j - 1] > arr[j]) {
                x = arr[j - 1]
                arr[j - 1] = arr[j]
                arr[j] = x
                k = j
            }
            r = k - 1
        }
    } while (!(l > r))
}

const selectSort = (arr) => {
    let k = 0
    let x = 0
    for (let i = 0; i < arr.length; i++) {
        k = i
        x = arr[i]
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < x) {
                k = j
                x = arr[j]
            }
        }
        arr[k] = arr[i]
        arr[i] = x

    }
}

