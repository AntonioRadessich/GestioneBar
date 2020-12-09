var loggedUser={};

function login()
{
    //get the form object
    var email = document.getElementById("loginEmail").value;
    fetch('../api/v1?email=' + email)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        //document.cookie='loggedUser:'+data[0].email;
        if(!(data.email == undefined)){
            var category=data.category;
            loggedUser.token=data.token;
            loggedUser.category=data.category;
            loggedUser.self=data.self;
            loggedUser.email=data.email;
            localStorage.setItem("loggedUser",JSON.stringify(loggedUser));
            //alert(JSON.parse(localStorage.getItem("loggedUser")).token);
            window.location.replace("/"+category+".html",true);
        }
        return false;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
    return false;
};

function getUserEmail(){
    //alert(localStorage.getItem("loggedUser").email);
    return JSON.parse(localStorage.getItem("loggedUser")).email;
}

function getUser(){
    var logged=JSON.parse(localStorage.getItem("loggedUser")).email;
    logged=logged.split("@")[0];
    return logged;
}

function logout(){
    loggedUser={};
    localStorage.removeItem("loggedUser");
    window.location.href="../index.html";
}