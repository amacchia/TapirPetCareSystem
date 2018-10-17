// Reference to db
const database = firebase.database();

function createUser(user) {     
    // Read from db
    database.ref('/users/').once('value').then( function(data) {
        // The data returned is a js object of users
        var users = data.val();
        // The usernames are the keys to the users
        var usernames = Object.keys(users);

        // Check if username exists
        var isTaken = false;
        for (let index = 0; index < usernames.length; index++) {
            const username = usernames[index];
            if (user.username == username) {
                isTaken = true;
                break;
            }
        }

        if (isTaken) {
            alert("Username is alreadyTaken");
        } else {
            // Write user to db
            database.ref('/users/' + user.username).set(user);

            // Add code to redirect to pet home screen
			window.location.href = "login.html";
        }
    });
}

function getUser(username, password) {
    // Read from db
    var result = database.ref('/users/').once('value').then( function(data) {
        // The data returned is a js object of users
        var users = data.val();
        // The usernames are the keys to the users
        var usernames = Object.keys(users);

        // Find the user with the matching username and password
        for (let index = 0; index < usernames.length; index++) {
            // The username of the user
            var name = usernames[index];

            // The object of the user
            var user = users[name];

            // The password of the user
            var pwrd = user.password;

            // Check if the username and password match the user
            // we are looking for, if so return that user object
            if (name == username && pwrd == password) {
				localStorage.localUsername = user.username;
				localStorage.localPassword = user.password;
				localStorage.userStatus = "loggedin";
				window.location = "home.html";
				return user;
            }
			//does not work but should return "Username does not exist!" when there is no user with that name
			if (name != user.username) {
				document.getElementById("error").innerHTML = "Username does not exist!";
            }
			//returns "wrong password if user is found but the password does not match
			if (name == username && pwrd != password) {
				document.getElementById("error").innerHTML = "Wrong password!";
				break;
            }
        }
    });
    return result;
}

//load user info if they are online otherwise go to login page
function loadUser()
{
	var localstatus = localStorage.getItem('userStatus');
	if(localstatus != "loggedin")
	{
		if(localstatus == "loggedout"){
			window.location = 'login.html';
		}
	}
	if(localstatus == "loggedin")
	{
		updatePage(localStorage.localUsername, localStorage.localPassword);

	}
}

//log user off
function logOff(){
	localStorage.userStatus = "loggedout";
}

function updatePage(username, password) {
        // Read from db
    var result = database.ref('/users/').once('value').then( function(data) { 
		// The data returned is a js object of users
        var users = data.val();
        // The usernames are the keys to the users
        var usernames = Object.keys(users);

        // Find the user with the matching username and password
        for (let index = 0; index < usernames.length; index++) {
            // The username of the user
            var name = usernames[index];

            // The object of the user
            var user = users[name];

            // The password of the user
            var pwrd = user.password;
            // Check if the username and password match the user
            // we are looking for, if so return that user object
            if (name == username && pwrd == password) {
				localStorage.localUsername = user.username;
				localStorage.localPassword = user.password;
				try {
					document.getElementById("username").innerHTML = user.username;
					document.getElementById("petName").innerHTML = user.petName;
					document.getElementById("petHealth").innerHTML = user.petHealth;		
				}
				catch(err){
				}
            }
        }
    });
}

function updateUser(username, password) {

}

function deleteUser(username, password) {
    
}