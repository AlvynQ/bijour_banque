const user = {
    name: "Doe",
    firstname: "John",
    email: "john.doe@hello.bk",
    password: "1234",
    isAdmin: true,
  };

  console.dir(user);

console.log("hello John, i know your password :-)", user.password);

//document.querySelector("#name").textContent = user.name;


let inputName = "";
let inputPassword = "";

btLogin.addEventListener("click", accessAuthorized);



function accessAuthorized(){

  inputName = document.getElementById("inputName").value;
  inputPassword = document.getElementById("inputPassword").value;

  if(inputName != user.name){
    document.getElementById('warning').innerHTML = "Nom incorrect.";
  }
  else if(inputPassword != user.password){
    document.getElementById('warning').innerHTML = "Mot de passe incorrect.";
  }
 
  if(inputName == user.name && inputPassword == user.password){
    window.location.href="./index.html"
  }

}

//fonction pour afficher le mot de passe en clair avec checkbox
function showPassword() {

    var viewPass = document.getElementById("inputPassword");
    if (viewPass.type === "password") {
      viewPass.type = "text";
    } else {
      viewPass.type = "password";
    }
  }
  
