function addUser() {
    var database = firebase.database();

    var usersRef = database.ref('users');
    var data = {
        username: document.getElementById('regusername').value,
        password: document.getElementById('regpassword').value,
        petHealth: 100,
        petName: document.getElementById('regpetname').value
    }

    usersRef.push(data);
}