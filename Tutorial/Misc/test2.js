        const products = [
    { name: "Apple", price: 50 },
    { name: "Milk", price: 25 },
    { name: "Bread", price: 30 },
    { name: "Eggs", price: 12 },
    { name: "Cheese", price: 85 },
    { name: "Butter", price: 55 }
];
var text1 = " ";
var text2 = " ";
for (i = 0; i < products.length; i++) {
    text1 += products[i].name;
    text2 += products[i].price ;
}

console.log(text1,text2);



const expensiveProducts = products.filter(item => {
    return item.price > 50; 
});

console.log(expensiveProducts);