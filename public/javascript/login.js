async function loginFormHandler(event) {
  event.preventDefault();

  //   form, get username and password. value and trim
  const userName = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  //   use the username and password of inputs to login!
  //  this will match the post method in API routes /login
  if (userName && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        userName,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // send to dashboard where the user can see their posts!
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusTexts);
    }
  }
}

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
