const form = document.querySelector("form");

let loginEmail = document.getElementById("loginemail");
let loginPassword = document.getElementById("password");
const formSelect = document.querySelector("form");


function checkEmailError() {
  let emailValue = loginEmail.value;
  let pwdValue = loginPassword.value;
  const trueEmail = "sophie.bluel@test.tld";
  const truePwd = "S0phie";
  const spanMail = document.querySelector("#error_mail");
  const spanPwd = document.querySelector("#error_pwd");

  if (emailValue === "" || emailValue != trueEmail){
    spanMail.textContent = "Erreur utlisateur";
  }
  if (pwdValue == "" || pwdValue != truePwd){
    spanPwd.textContent = "Erreur mot de passe";
  };
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
    console.log("catch de l'appel fetch", error);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let emailValue = loginEmail.value;
  let passwordValue = loginPassword.value;
  const loginResponse = await connect(emailValue, passwordValue);
  let tokenResponse = loginResponse.token;
  if (tokenResponse) {
    console.log(tokenResponse);
    localStorage.setItem("token", tokenResponse);
    console.log(localStorage);
    window.location.replace("index.html");
  }
  checkEmailError();
});
