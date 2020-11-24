function login()
{
    //get the form object
    var email = document.getElementById("loginEmail").value;
    //console.log(email);
    fetch('../api/v1/?email=' + email)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        document.cookie='loggedUser:'+data[0].email;
        var category=data[0].category;
        window.location.replace("/"+category+".html",true);
        return false;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
    return false;
};

function getUserEmail(){
    var logged=document.cookie
    .split("; ")
    .find(row=>row.startsWith("loggedUser"))
    .split(":")[1];
    return logged;
}

function getUser(){
    var logged=document.cookie
    .split("; ")
    .find(row=>row.startsWith("loggedUser"))
    .split(":")[1];
    logged=logged.split("@")[0];
    return logged;
}

function logout(){
    document.cookie="loggedUser:";
    window.location.href="http://localhost:8000/";
}