function addUser() {
    // Get the data from the fields
    var username = document.getElementById('regusername').value;
    var password = document.getElementById('regpassword').value;
	var passwordrepeat = document.getElementById('regpasswordrepeat').value;
    var petname = document.getElementById('regpetname').value;

	if(password == passwordrepeat && username != "" && petname != "")
	{
    // Once user class is created, create user object
    var user = {
        "username": username,
        "password": password,
        "petHealth": 100,
        "petName": petname,
        "currency": 500,
        "inventory": {
            "kibble": 0,
            "brush": 0,
            "ball": 0,
            "shampoo": 0
        }
    }

    // Try to add user to the database
    createUser(user);
	}
	else if(password != passwordrepeat){
		document.getElementById("error").innerHTML = "Password does not match!";
	}
	else if(username == ""){
		document.getElementById("error").innerHTML = "Missing username!";
	}
	else if(petname == ""){
		document.getElementById("error").innerHTML = "Missing pet name!";
	}
}