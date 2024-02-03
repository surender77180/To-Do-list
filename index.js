import { User } from "./user.js"

User.initStorage();

if (!User.isLogged()) {

  const loginForm = document.getElementById("login_form");
  loginForm.addEventListener("submit", eve => {
    eve.preventDefault();
    const fd = new FormData(loginForm);
    const username = fd.get("username");
    const password = fd.get("password");
    const formUser = new User(username, password);
    if (User.isValidUser(formUser, true)) {
      const user = User.getInfo(formUser.name);
      User.setCurrentUser(user);
      window.location.href = "/dash.html";
    }
  });
} else {
  window.location.href = "/dash.html";
}
