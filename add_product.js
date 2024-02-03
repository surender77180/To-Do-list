import { User } from "./user.js"
import { Product } from "./product.js";

Product.initStorage();

if (User.isLogged() && !User.isAdmin()) {
  window.location.href = "/dash.html";
} else {
  const form = document.getElementById("adding_prod_form");

  form.addEventListener("submit", function (eve) {
    eve.preventDefault();

    const fd = new FormData(form);
    const name = fd.get("prod_name");
    const desc = fd.get("prod_desc");
    const price = fd.get("prod_price");
    const image = fd.get("prod_image");

    const product = new Product(name, desc, price, image);
    Product.addProductToStorage(product);
  })
}