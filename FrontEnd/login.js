const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let loginEmail = document.getElementById("loginemail");
    let loginPassword = document.getElementById("password");
    let email = loginEmail.value;
    let password = loginPassword.value;
    const emailRegEx = new RegExp("[A-Za-z._-]+@[a-z._-]+\\.[a-z._-]+");
    /*if (!emailRegEx.test(email) || password === "") {
        //throw new Error("mail invalid or password missing");
    }*/
    const login = {
        email: event.target.email,
        password: event.target.password
    };

    const chargeUtile = JSON.stringify(login);
    const reponse = fetch("http://localhost:5678/api/users/login", {
        method:"POST",
        headers:{"Content-type":"application/json"},
        body: chargeUtile
    })
});