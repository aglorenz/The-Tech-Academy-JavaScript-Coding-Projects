function processOrder() {
    // --------------------------------------------------------------------------
    // This function parses through the pizza menu and checks for elements
    // checked/selected by the user, consolidate the info into a 2D array, 
    // and displays the receipt to the user.  i.e., user selections, individual price,
    // and total price.


    //---------------------------------------------------------------------------
    // This 2D array holds list of selected pizza ingredients and prices for the 
    // final receipt.
    //---------------------------------------------
    var namePriceArray = [];  
    
    //---------------------------------------------
    // Data driven program
    // Create lookup tables to drive the program and avoid repeated
    // if then else if statements
    //---------------------------------------------
    var sizeArray= [];  //populate a lookup table of pizza size and price
    sizeArray.push(["Personal",6]);
    sizeArray.push(["Medium",10]);
    sizeArray.push(["Large",14]);
    sizeArray.push(["Extra Large",16]);
    
    var crustArray= [];  //populate a lookup table of crust type and price
    crustArray.push(["Plain",0]);
    crustArray.push(["Garlic Butter",0]);
    crustArray.push(["Cheese Stuffed",3]);
    crustArray.push(["Spicy",0]);
    crustArray.push(["House Special",0]);
    
    var cheeseArray= [];  //populate a lookup table of cheese type and price
    cheeseArray.push(["No Cheese",0]);
    cheeseArray.push(["Regular Cheese",0]);
    cheeseArray.push(["Extra Cheese",3]);

    var meatCount = 0;   // Number of meat items selected
    var veggieCount = 0; // Number of veggie items selected

    var itemArray = [];     // to hold array of items contained in various menu sections

    //---------------------------------------------
    // Add pizza size and price to the array
    //---------------------------------------------
    itemArray = document.getElementsByClassName("size");
    for (var i = 0; i < itemArray.length; i++) {
        if (itemArray[i].checked) {
            namePriceArray.push([sizeArray[i][0], sizeArray[i][1]]); // size, price
            {break} // only 1 choice, so break when the first is found
        }
    }
    
    //---------------------------------------------
    // Add crust selection and price to the array
    //---------------------------------------------
    itemArray = document.getElementsByClassName("crust");
    for (var i = 0; i < itemArray.length; i++) {
        if (itemArray[i].checked) {
            namePriceArray.push([crustArray[i][0], crustArray[i][1]]); // crust, price
            {break} // only 1 choice, so break when the first is found
        }
    }
    
    //---------------------------------------------
    // Add sauce selection and price to the array
    //---------------------------------------------
    itemArray = document.getElementsByClassName("sauce");
    for (var i = 0; i < itemArray.length; i++) {
        if (itemArray[i].checked) {
            namePriceArray.push([itemArray[i].value, 0]); // sauce, price -- price always 0
            {break} // only 1 choice, so break when the first is found
        }
    }
    
    //---------------------------------------------
    // Add cheese selection and price to the array
    //---------------------------------------------
    itemArray = document.getElementsByClassName("cheese");
    for (var i = 0; i < itemArray.length; i++) {
        if (itemArray[i].checked) {
            namePriceArray.push([cheeseArray[i][0], cheeseArray[i][1]]); // cheese, price
            {break} // only 1 choice, so break when the first is found
        }
    }

    //---------------------------------------------
    // Add meat selection and price to the array
    //---------------------------------------------
    itemArray = document.getElementsByClassName("meat");
    for (var i = 0; i < itemArray.length; i++) {
        if (itemArray[i].checked && meatCount < 1 ) {
            namePriceArray.push([itemArray[i].value, 0]); // meat, price -- first one free
            meatCount++;
        } else if (itemArray[i].checked) {
            namePriceArray.push([itemArray[i].value, 1]); //  all others $1
            meatCount++;
        }
    }
    
    //---------------------------------------------
    // Add veggie selection and price to the array
    //---------------------------------------------
    itemArray = document.getElementsByClassName("veggies");
    for (var i = 0; i < itemArray.length; i++) {
        if (itemArray[i].checked && veggieCount < 1 ) {
            namePriceArray.push([itemArray[i].value, 0]); // veggie, price -- first one free
            veggieCount++;
        } else if (itemArray[i].checked) {
            namePriceArray.push([itemArray[i].value, 1]); //  all others $1
            veggieCount++;
        }
    }
    
    //---------------------------------------------
    // Show the receipt to the user
    //---------------------------------------------
    displayReceipt(namePriceArray)
}

//-----------------------------------------------------------------
// Given a 2D list of items and prices:
// 1) create two HTML formatted strings separated by line breaks.  
//    One for items selected, one for the corresponding prices.
// 2) Calculate total price along the way
// 3) Inject all 3 into the cart.
//-----------------------------------------------------------------
function displayReceipt(namePriceArray) {
 
    // To hold a list of pizza items and their respective prices
    var itemNameList = "";
    var itemPriceList = "";
    var totalPrice = 0;

    // loop through the 2D Name/Price array and format the text lists 
    // for final output.  Calculte the total price.
    for (var i = 0; i < namePriceArray.length; i++) {
        itemNameList += namePriceArray[i][0] + "<br>";
        itemPriceList += "$" + namePriceArray[i][1] + ".00" + "<br>";
        totalPrice += namePriceArray[i][1];
    }
    document.getElementById("cart").style.opacity=.90; // turn on the cart
    document.getElementById("itm-sel").innerHTML=itemNameList;
    document.getElementById("itm-prc").innerHTML=itemPriceList;
    document.getElementById("tot-prc").innerHTML="<h3>$"+totalPrice+".00"+"</h3>";
}

function clearSelections() {
    document.getElementById("menuForm").reset();
    document.getElementById("cart").style.opacity=0;
}