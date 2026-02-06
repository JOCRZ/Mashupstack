var random = Math.floor(Math.random() * 2);
console.log(random);
let fb;
let data;
let feedback;

   fb = {
  "full_name": "Alex Johnson",
  "email_address": "alex.j@example.com",
  "subject": "Bug Report",
  "message": "Thank you for responding quickly"
   }


if (random == 1){
    feedback = JSON.stringify(fb);
    };


try {
    data = JSON.parse(feedback);
    console.log("Successfully Parsed to Object!");
    
    let msg = data.message;
    

    let check = /thank/i.test(msg);

        if (check){
            console.log("Positive feedback received");
        }
        else{
            console.log("feedback Noted");
        }


} catch (error) {
    console.error("JSON is invalid:", error.message);

}

