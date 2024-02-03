import { Product } from "./product.js";
import { User } from "./user.js";
import { showCartItem } from "./cart.js";

if (!User.isLogged()) {
  alert("sign in first to purschase products");
  window.location.href = "/"
} else {

  const currentUser = User.getCurrentUser();
  const cartListElem = document.getElementById("cart_list");
  const cartList = currentUser.cart.items;

  for (const prodID in cartList) {
    const quantity = cartList[prodID];
    const product = Product.getInfo(prodID);

    const cartItemElem = document.createElement("li");
    cartItemElem.innerHTML = showCartItem(product, quantity);
    cartListElem.appendChild(cartItemElem);

    const quantityElem = document.getElementById(`quantity_${prodID}`);

    const decBtn = document.getElementById(`dec_btn_${prodID}`);
    const incBtn = document.getElementById(`inc_btn_${prodID}`);

    const delBtn = document.getElementById(`del_btn_${prodID}`);
    const infoBtn = document.getElementById(`view_desc_btn_${prodID}`);

    decBtn.onclick = function () {
      const user = User.getCurrentUser();
      user.cart.decQuantity(prodID);

      const quantity = user.cart.items[prodID];
      if (quantity) quantityElem.textContent = quantity;
      else window.location.href = "/cart.html";
    }

    incBtn.onclick = function () {
      const user = User.getCurrentUser();
      user.cart.incQuantity(prodID);
      quantityElem.textContent = user.cart.items[prodID];
    }

    delBtn.onclick = function () {
      const user = User.getCurrentUser();
      user.cart.removeItem(prodID);
      window.location.href = "/cart.html";
    }

    infoBtn.onclick = function () {
      product.showDesc();
    }
  }
}