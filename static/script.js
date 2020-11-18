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
        alert(category);
        alert("redirect to: "+"http://localhost:8000/"+category+"html")
        window.location.href("http://localhost:8000/"+category+".html");
        return false;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
};

function getUser(){
    var logged=document.cookie
    .split("; ")
    .find(row=>row.startsWith("loggedUser"))
    .split(":")[1];
    document.getElementById("btn").innerHTML=logged;
}
function logout(){
    document.cookie="loggedUser:";
    window.location.href="http://localhost:8000/";
}