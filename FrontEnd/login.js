const form = document.querySelector("form");

let loginEmail = document.getElementById("loginemail");
let loginPassword = document.getElementById("password");


function checkEmailError() {
  const emailRegEx = new RegExp("[a-z._-]+@[a-z._-]+\\.[a-z._-]+");
}

async function connect(mail, pwd) {
  const url = "http://localhost:5678/api/users/login";

  const chargeUtile = JSON.stringify({
    email: mail,
    password: pwd
  });

  try {
    const reponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile
    });
    return await reponse.json();
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let emailValue = loginEmail.value;
  let passwordValue = loginPassword.value;
  const loginResponse = await connect(emailValue, passwordValue);
  let tokenResponse = loginResponse.token;
  console.log(tokenResponse);
  if (tokenResponse) {
    const stringifyToken = JSON.stringify(tokenResponse);
    console.log(stringifyToken);
    localStorage.setItem("token", stringifyToken);
    console.log(localStorage);
    window.location.replace("index.html");
  } else {
    alert("Erreur utilisateur ou mot de passe")
  };
});
