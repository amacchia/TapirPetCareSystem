function addUser() {
    // Reference to db
    var database = firebase.database();

    // Reference to users path of db
    var usersRef = database.ref('users');

    // Example of data
    var data = {
        username: "amacchia",
        password: "goodpassword",
        petHealth: 100,
        petName: "Bobo"
    }

    // Write user to db
    usersRef.push(data);

    // Read from db
    usersRef.on('value', function(data) {
        // The data returned is a js object of users
        var users = data.val();

        // An array of the keys to the user acounts
        var keys = Object.keys(users);

        // Use the keys to access the user objects
        keys.forEach(element => {
            var userObject = users[element];
            console.log(userObject.username);
            console.log(userObject.password);
        });

    });
}