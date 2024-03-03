const form = document.querySelector("form");

let loginEmail = document.getElementById("#loginemail");
let loginPassword = document.getElementById("#password");

function checkEmailError() {
    const emailRegEx = new RegExp("[a-z._-]+@[a-z._-]+\\.[a-z._-]+");
}

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const login = {
        email : event.target.querySelector("#loginemail").value,
        password : event.target.querySelector("#password").value,
      }
      const chargeUtile = JSON.stringify(login);

      fetch("http://localhost:5678/api/users/login", {
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: chargeUtile
      });

});