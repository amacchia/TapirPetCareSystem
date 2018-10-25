function addUser() {
    // Get the data from the fields
    var username = document.getElementById('regusername').value;
    var password = document.getElementById('regpassword').value;
    var petname = document.getElementById('regpetname').value;

    // Once user class is created, create user object
    var user = {
        "username": username,
        "password": password,
        "petHealth": 100,
        "petName": petname,
        "currency": 500
    }

    // Try to add user to the database
    createUser(user);
}
