var loggedUser;

function login()
{
    //get the form object
    var email = document.getElementById("loginEmail").value;

    fetch('../api/v1?email=' + email)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        //console.log(data);
        loggedUser = data[0];
        console.log(loggedUser);
        //loggedUser.id = loggedUser.self.substring(loggedUser.self.lastIndexOf('/') + 1);
        //document.getElementById("loggedUser").innerHTML = loggedUser.email;
        return;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here



    
};