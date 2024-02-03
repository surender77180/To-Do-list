import { User } from "./user.js";
import { checkout } from "./cart.js";

(async function () {

  const data = await fetch("/header.html");
  const html = await data.text();
  const headerElem = document.getElementById("header");
  headerElem.innerHTML = html;

  if (!User.isLogged()) {
    alert("User is not logged in");
    window.location.href = "/";
  } else {

    const user = User.getCurrentUser();

    // console.log(user);
    const userNameElem = document.getElementById("user_name");
    userNameElem.textContent = user.name;

    const logoutBtnElem = document.getElementById("logout_btn");
    logoutBtnElem.addEventListener("click", function () {
      User.removeCurrentUser();
      window.location.href = "/"
    })
  }

  handleMenu();
})()

function handleMenu() {

  if (!User.isLogged()) {
    alert("You're not loggedin");
    window.location.href = "/";
  } else {

    const pageBtnMap = {};

    pageBtnMap["/dash.html"] = [{
      name: "Add Product",
      loc: "/add_product.html",
      admin: true
    }, {
      name: "Cart",
      loc: "/cart.html",
    }];

    pageBtnMap["/add_product.html"] = [{
      name: "dash",
      loc: "/dash.html",
    }, {
      name: "Cart",
      loc: "/cart.html"
    }];

    pageBtnMap["/cart.html"] = [{
      name: "dash",
      loc: "/dash.html"
    }, {
      name: "Add Product",
      loc: "/add_product.html",
      admin: true
    }, {
      name: "Checkout",
      loc: "/cart.html",
      func: checkout
    }];

    const page = window.location.pathname;

    const btns = pageBtnMap[page];
    for (let i = 0; i < btns.length; i++) {
      const btn = btns[i];
      if (btn.admin && !User.isAdmin()) continue;
      const btnWrapElem = document.getElementById("btn_" + (i + 1) + "_wrap");
      btnWrapElem.classList.remove("hidden");

      const btnElem = document.getElementById("btn_" + (i + 1));
      btnElem.textContent = btn.name;
      btnElem.onclick = btn.func ? btn.func : function () {
        window.location.href = btn.loc;
      };
    }

    const userNameElem = document.getElementById("user_name");
    const logoutBtnElem = document.getElementById("logout_btn");

    const user = User.getCurrentUser();

    userNameElem.textContent = user.name;
    logoutBtnElem.onclick = function (eve) {
      eve.preventDefault(); // just habit
      User.removeCurrentUser();
      window.location.href = "/";
    }
  }
}