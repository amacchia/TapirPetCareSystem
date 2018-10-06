function addUser() {
    var database = firebase.database();

    var usersRef = database.ref('users');
    var data = {
        username: "amacchia",
        password: "goodpassword",
        petHealth: 100,
        petName: "Bobo"
    }

    usersRef.push(data);
}