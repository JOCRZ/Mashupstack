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



let nickname = "user1"; 

nickname ??= "Guest User"; 

console.log(nickname); // "Guest User"

let status = ""; 

status ||= "Away"; 

console.log(status); // "Away"

let isLoggedIn = true;

isLoggedIn &&= "Welcome Back!"; 

console.log(isLoggedIn); // "Welcome Back!"

*/

console.log('Continue');
const cart = ["Apple", "Milk", "BROKEN_BOTTLE", "Bread", "Eggs"];

for (let i = 0; i < cart.length; i++) {
    if (cart[i] === "BROKEN_BOTTLE") {
        continue; // Skip this one!
    }
    console.log("Adding to bag: " + cart[i]);
}

console.log('break');

for (let i = 0; i < cart.length; i++) {
    console.log("Checking item: " + cart[i]);
    
    if (cart[i] === "Milk") {
        console.log("Found the Milk! Leaving now.");
        break; // Stop the whole loop!
    }
}


console.log(toString(10));