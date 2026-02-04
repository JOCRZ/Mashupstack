
const number = Number(prompt("Enter your prediction"));
let i = 1;

while(i <=5){



switch(number){
    case 1:
        console.log("You guessed wrong");
        break;
    
    case 2:
        console.log("You guessed wrong");
        break;

    case 3:
        console.log("You guessed wrong");
        break;

    case 4:
        console.log("You guessed right");
        break;
    
    case 5:
        console.log("You guessed wrong");
        break;

    default:
        console.log("Enter number between 1 and 5");
        break;
}
i++;
}