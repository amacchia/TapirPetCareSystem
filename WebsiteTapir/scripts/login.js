function login() {

    // Get the data from the fields
    var username = document.getElementById('logusername').value;
    var password = document.getElementById('logpassword').value;

    // The Promise returned from the getUser function
    var userPromise = getUser(username, password);
    
    // Get the value of the Promise, and log it for now
    userPromise.then(function (user){
            console.log(user);
    });
    
    var currTime = Date.now();
    var lastLogin = user.lastLogin;
    var currPetHealth = user.petHealth;
    var currCurrency = user.currency;
    
    if ((currTime - lastLogin) > 86400000) {
           var newData = currCurrency + 100;
           var updatedData = {
               currency: newData
           }
           updateUser(username, updatedData);
        
           var newData = currPetHealth - 20;
           var updatedData = {
               petHealth: newData
           }
           updateUser(username, updatedData);
        
           var newData = currTime;
           var updatedData = {
             lastLogin: newData
           }
           updateUser(username, updatedData);
    }
}
