const data = {
  name: "John Doe",
  email: "johndoe@example.com",
  message: "This is a sample comment for the user system."
};
let jason = JSON.stringify(data);
console.log(jason);
console.log(typeof(jason));
console.log("")

let obj = JSON.parse(jason);
console.log(obj);
console.log(typeof(obj));
console.log("");

let random;

readobj = (txt) => {
    random = Math.floor(Math.random() * 2)
    
    if (random == 1){
          for (x in txt){
    console.log(x + " : " + txt[x]);
  }
    }
    else{
          for (x in tx){
    console.log(x + " : " + txt[x]);
  }
    }

}


try{
readobj(obj);
}
catch(err){
    console.log("You have an error");
}