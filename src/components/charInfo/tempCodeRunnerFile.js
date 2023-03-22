const array = [1,2,3,4,5,6,7,8]

const binarySearch = (array, item) => {
    let low = 0;
    let high = array.length - 1;
    while (low < high) {
        let mid = Math.ceil(high/2);
        let guess = array[mid]
        if(guess == item) return guess;
        if(guess < item) high = mid - 1;
        if(guess > item) low = mid + 1;
    }
    return null;
}
let a = binarySearch(array, 1);
console.log(a);