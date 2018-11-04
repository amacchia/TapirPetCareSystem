const ballPrice = 100;
const brushPrice = 30;
const kibblePrice = 100;
const shampooPrice = 125;


function buyItem(item) {
    var username = document.getElementById("username").textContent.substr(10);
    var userFunds = Number(document.getElementById("currency").textContent.substr(9)); 
    var itemPrice;
    switch (item) {
        case "ball":
            itemPrice = ballPrice;
            break;
        case "brush":
            itemPrice = brushPrice;
            break;
        case "kibble":
            itemPrice = kibblePrice;
            break;
        case "shampoo":
            itemPrice = shampooPrice;
            break;
    }

    if (userFunds < itemPrice) {
        alert("Insufficent Funds");
    } else {
        // Reference to the user's inventory
        var userRef = database.ref('/users/' + username + '/inventory/');

        // Get the current value of an item and increment it
        userRef.once("value").then(function(snapshot) {
            // Pass in item here in case function ends before read is finished
            var itemName = item;

            var currentValue = snapshot.val()[itemName];
            var newValue = currentValue + 1;
            var updatedItem = {
                [itemName]: newValue
            }

            var newFunds = userFunds - itemPrice;
            var updatedCurrency = {
                currency: newFunds
            }

            // Update the user's inventory and currency
            updateUserInventory(username, updatedItem);
            updateUser(username, updatedCurrency);
        });
    }
}