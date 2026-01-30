function processReturn() {
    // 1. Create the object with current input data
    const order = {
        itemName: "headphone",
        isDelivered: true,
        daysSinceDelivery: 4
    };

    // 2. Logic Check (Ternary Operator instead of if-else)
    const status = (order.isDelivered && order.daysSinceDelivery <= 7) 
        ? "Eligible for Return" 
        : "Return Period Expired";
    
    console.log(status)

    // 3. Check if 'itemName' exists
    const hasName = "itemName" in order;
    console.log("Does itemName exist?", hasName);

    // 4. Remove 'daysSinceDelivery' property
    delete order.daysSinceDelivery;
    
    console.log("Updated Object:", order);
}

processReturn();