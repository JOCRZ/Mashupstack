

const mysteryLevel = Math.floor(Math.random() * 50) + 1;


const userInput = "45";
const userScore = Number(userInput); 

const diff = Math.abs(mysteryLevel - userScore);

const scoreSqrt = Math.sqrt(userScore);


const piValue = Math.PI;

const implicitResult = "20" * 5;


const highest = Math.max(10, 20, mysteryLevel);
const lowest = Math.min(10, 20, mysteryLevel);


console.log(`Mystery Level: ${mysteryLevel}`);
console.log(`User Score: ${userScore}`);
console.log(`Difference: ${diff}`);
console.log(`Square Root of Score: ${scoreSqrt}`);
console.log(`Value of Pi: ${piValue}`);
console.log(`Implicit (20 * 5): ${implicitResult}`);
console.log(`Highest value: ${highest}, Lowest value: ${lowest}`);