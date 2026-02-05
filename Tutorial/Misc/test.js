let input = "My son is 12 years old. Our flat number is 45 and contact is 9876543210";
console.log(input);
let check = /\d/.test(input);

if (check){
    let text = input.replace(/\d/g,"NUMBER");
    console.log("The Text has Number")
    console.group(text);

}
else{
    console.log("The doesn't contain any Number")
}

