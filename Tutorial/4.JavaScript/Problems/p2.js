/*
// 1 JavaScript Program To Print Hello World

console.log("Hello World");

// 2 JavaScript Program to Add Two Numbers

let x = 2;
let y = 3;
console.log(x+y);

// 3 JavaScript Program to Find the Square Root

let x2 = 2;
console.log(x*2);

// 4 JavaScript Program to Calculate the Area of a Triangle

let l = 2;
let b = 3;
let h = 4;

console.log("Area of triangle = "+ l*b*h);

// 5 JavaScript Program to Swap Two Variables

let s1 = 2;
let s2 = 3;

 console.log("before swap");
 console.log(s1,s2);

let s3 = s2;
 s2 = s1;
 s1 = s3;

 console.log("after swap");
 console.log(s1,s2); console.log("before swap");
 console.log(s1,s2);

 // 6 JavaScript Program to Solve Quadratic Equation
 // ax2 + bx + c = 0, where
 //   a, b and c are real numbers and
 //   a ≠ 0



let a = 1;
let b = -5;
let c = 6;

if (a == 0){
    console.log("a need be larger than 0");
}
else{

let r = (b ** 2) - (4 * a * c);
let sr = Math.sqrt(r);

let x = (-b + sr) / (2 * a);
let y = (-b - sr) / (2 * a);

console.log(x,y);
}



 // 7 JavaScript Program to Convert Kilometers to Miles
 
 const _1km = 0.621371;
 let km = 5;

 console.log(`${km} kilometer is ${km * _1km} miles`);



//  8 Javascript Program to Convert Celsius to Fahrenheit


let c = 5;
let f  = (c * 1.8)+32;
console.log(`${c} Degree Celsius is ${f} Fahrenheit`);



// 9 Javascript Program to Generate a Random Number

let x = Math.round(Math.random()*100);
console.log(`Random Number ${x}`);



// 10 Javascript Program to Check if a number is Positive, Negative, or Zero


let arr = [-1, 0 , 1];

let r = Math.floor(Math.random() * 3);

let num = arr[r];

if (num == -1){
    console.log(`${num} is Negative`);
}
else if (num == 0) {
    console.log(`${num} is Zero`);
}
else{
    console.log(`${num} is Positive`);
}



// 11 Javascript Program to Check if a Number is Odd or Even

let num = 4;

if (num %2 == 0){
    console.log("The number is Even");
}
else{
    console.log("The number is Odd");
}

// 12 JavaScript Program to Find the Largest Among Three Numbers

let a = 3;
let b = 1;
let c = 5;

if (a >= b & a >= c){
    console.log(`${a} is the greatest among`);
}
else if (b >=a & b >= c){
    console.log(`${b}is greatest among`);
}
else{
    console.log(`${c} is greatest among`);
}



// 13 JavaScript Program to Check Prime Number

let num = 13;

if (num  == 1){
    console.log("1 is neither Prime or Composite");
}
else if (num == 2){
    console.log("2 is Prime");
}
else if (num %2 != 0){
    console.log(`${num} is Prime`);
}
else {
    console.log("Not Prime");
}



// 14 JavaScript Program to Print All Prime Numbers in an Interval

let start = 0;
let end = 25;

let i;

let arr = [];
for (i = start; i <= end ; i++){

    if ( i == 1){
        continue;
    }
    else if (i == 2){
        arr.push(i);
    }
    else if (i %2 != 0){
        arr.push(i);
    }
    else {
        continue;
    }
    
}
console.log(arr);



// 15 JavaScript Program to Find the Factorial of a Number
// need to try out in reverse 

let num = 5;
let fact = num;
let i;
let text = "";

for (i = 1; i <5 ; i++){
    fact *= i;
    text += 'x' + i; 
}
console.log(`Factorial of ${num} is ${fact}`);
console.log(text);


// JavaScript Program to Display the Multiplication Table

let num = 9;

for (i = 1; i <= 10; i++){
    console.log(`${i} x ${num} = ${i*num}`);
}

*/