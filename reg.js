import { User } from "./user.js";

User.initStorage();

const regForm = document.getElementById("reg_form");
const info = document.getElementById("message");

regForm.addEventListener("submit", eve => {
  eve.preventDefault();

  const fd = new FormData(regForm);
  const username = fd.get("name");
  const password = fd.get("password");
  const role = fd.get("isadmin") ? "admin" : "customer";//on null
  
  const formUser = new User(username, password, role);
  if (User.isValidUser(formUser)) {
    info.innerHTML = `user already existed. Please <a href="/">Login</a>.`;
    info.style.color = "red";
  } else {
    User.addToStorage(formUser);
    info.innerHTML = `Account created. Please <a href="/">Login</a>.`;
    info.style.color = "green";
  }
  const existsUser = document.getElementById("existsUser");
  existsUser.classList.add("hidden");
})