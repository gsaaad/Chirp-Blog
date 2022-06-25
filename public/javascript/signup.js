async function signupFormHandler(event) {
  event.preventDefault();

  const firstName = document.querySelector("#firstname-signup").value.trim();
  const lastName = document.querySelector("#lastname-signup").value.trim();
  const userName = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  console.log(firstName, lastName, email, password, userName);

  if (firstName && lastName && userName && email && password) {
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        firstName,
        lastName,
        userName,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
