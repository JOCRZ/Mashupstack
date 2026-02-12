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


// 16 JavaScript Program to Display the Multiplication Table

let num = 9;

for (i = 1; i <= 10; i++){
    console.log(`${i} x ${num} = ${i*num}`);
}



// 17 JavaScript Program to Print the Fibonacci Sequence

let num = 10;
let n1 = 0;
let n2 = 1;
let i;
let next;

for (i = 0; i <=num; i++){
    console.log(n1);
    next = n1 + n2;
    n1 = n2;
    n2 = next;
    
}

// 18 JavaScript Program to Check Armstrong Number
// try out different methods to reach same goal

let num = 153;
let arr = String(num).split('').map(x);

function x(y){
    return Number(y);
}
let i;
let mul = 0;
for (i = 0; i< arr.length; i++){
    mul += arr[i]**3;
}

if (num == mul){
    console.log(`${num} is Amstrong`)
}
else{
    console.log(`${num} is not Amstrong`)
}



// 19 JavaScript Program to Find Armstrong Number in an Interval

let start = 1;
let end = 500;
let i;

let arr2 = [];
for (i = start; i <= end; i++){

        let num = i;
        let arr = String(num).split('').map(x);

        function x(y){
            return Number(y);
        }
        let j;
        let mul = 0;
        for (j = 0; j< arr.length; j++){
            mul += arr[j]**3;
        }

        if (num == mul){
            arr2.push(num);
        }
        else{
            continue;
        }

}

console.log(arr2);



// 20 JavaScript Program to Make a Simple Calculator

let x = 2;
let y = 4;
let cal = ['sum','sub','mul','div'];
let i = 1;
let ans ;

switch(cal[i]){
    case 'sum':
        ans = x + y;
        break;
    case 'sub' :
        ans = x - y;
        break;
    case 'mul':
        ans = x * y;
        break;
    case 'div':
        ans = x / y;
        break;
    default:
        console.log("Enter valide input between 0 and 3");               
}

console.log(`${cal[i]} of ${x} and ${y} is ${ans}`);



// 21 JavaScript Program to Find the Sum of Natural Numbers

let num = 100;

let i;
let sum = 0;

for (i = 1; i <= num; i++){
    sum += i;

}
console.log(sum);

// in while loop 

let j = 1;
let sum2 = 0;

while (j <= num){
    sum2 += j;
    j++;
}

console.log(sum2);


// 22 JavaScript Program to Check if the Numbers Have Same Last Digit

let value1 = 21;
let value2 = 521;

let txt1 = value1.toString();
let txt2 = value2.toString();

if (parseInt(txt1.at(-1)) == parseInt(txt2.at(-1))){
    console.log("Last Digit are Same");
}
else{
    console.log("Last Digit are Not Same");
}


// 23 JavaScript Program to Find HCF or GCD

let num1 = 12;
let num2 = 18;


function factarr(val){

            let i;
            arr = [];
            for (i = 1; i <=val; i++){

                if (val % i == 0){
                    arr.push(i);
                }
                else{
                    continue;
                }
            }

            return arr;

}


let num1arr = factarr(num1);
let num2arr = factarr(num2);

console.log(`Factorial of ${num1} is ${num1arr}`);
console.log(`Factorila of ${num2} is ${num2arr}`);

let intersecton = [];

let j;
let k;

for (j = 0; j <= num1arr.length; j++){
    for (k = 0; k <= num2arr.length; k++){
        if(num1arr[j] == num2arr[k]){
            intersecton.push(j);
        }
    }
}
console.log("");
console.log(`Common Values from both set are ${intersecton}.`)
console.log(` The GCD of Both set is ${Math.max(...intersecton)}.`);



// 24 JavaScript Program to Find LCM

let num1 = 4;
let num2 = 6;


function mularr(num){
        let i;
        let arr = [];

        for (i = 1; i <= 10; i++){
            arr.push(i*num);
            
        }
        return arr;
}

let num1arr = mularr(num1);
let num2arr = mularr(num2);



let intersecton = [];

let j;
let k;

for (j = 0; j < num1arr.length; j++){
    for (k = 0; k < num2arr.length; k++){
        if(num1arr[j] == num2arr[k]){
            intersecton.push(num1arr[j]);
        }
    }
}

console.log(`Common Multiples of ${num1} and ${num2} are ${intersecton}`)
console.log(`The LCM of ${num1} & ${num2} is ${Math.min(...intersecton)}`);


// 25 JavaScript Program to Find the Factors of a Number

let num = 18;

function factarr(val){

            let i;
            arr = [];
            for (i = 1; i <=val; i++){

                if (val % i == 0){
                    arr.push(i);
                }
                else{
                    continue;
                }
            }

            return arr;

}

let fact = factarr(num);
console.log(`Factors of ${num} is ${fact} `);

*/

// JavaScript Program to Find Sum of Natural Numbers Using Recursion

let x = 100;
let y = 1;
let sum = 0;


function evennum(x,y){
    sum += y;
    if ( y == x){
        return y;
    }
    else{
        return evennum(x,y + 1)
    }

}

evennum(x,y);
console.log(sum);