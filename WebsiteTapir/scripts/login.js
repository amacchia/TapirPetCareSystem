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
}