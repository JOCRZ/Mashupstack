/*
function evennum(num){
    console.log(num);
    if ( num == 8){
        return num;
    }
    else{
        return evennum(num + 1)
    }
}

evennum(2);

function recursiveSum(n) {
    if (n <= 0) {
        return 0;
    }
    return n + recursiveSum(n - 1);
}

console.log(recursiveSum(10));
*/

function recursiveSum(n) {
    console.log("Diving in: I need to solve " + n);

    if (n <= 0) {
        console.log("--- Hit the bottom! Returning 0 ---");
        return 0;
    }

    // This line pauses here to call recursiveSum(n-1)
    let result = n + recursiveSum(n - 1);

    console.log("Climbing out: " + n + " plus the rest equals " + result);
    return result;
}

recursiveSum(3);