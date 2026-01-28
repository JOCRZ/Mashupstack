function text_clean (txt) {
tr = txt.trim();    
lcase = tr.toLowerCase();
rep = lcase.replace("food","ambience");
pos = rep.indexOf("service");
spli = rep.split(" ");


console.log("Output " + spli + "\n" + " position of service " + pos)
}

var feedback = "   I loved the FOOD and the service!   ";

text_clean(feedback);