import { User } from "./user.js";
import { Product } from "./product.js";

User.initStorage();
Product.initStorage();

if (!User.isLogged()) {
    alert("You are not logged in, please sign in");
    window.location.href = "/";
} else {
    const prodListElem = document.getElementById("prod_list");
    const products = Product.getProductsFromStorage();
    
    for (const prodID in products) {
        const product = Product.getInfo(prodID);

        const listItem = document.createElement("li");
        listItem.innerHTML = product.showProduct();

        prodListElem.appendChild(listItem);

        const addCartBtn = document.getElementById(`add_cart_btn_${prodID}`);
        addCartBtn.addEventListener("click", function () {
            const user = User.getCurrentUser();
            user.cart.addItem(prodID);
            window.location.href = "/cart.html";
        })
        const viewDescBtn = document.getElementById(`view_desc_btn_${prodID}`);
        viewDescBtn.addEventListener("click", function () {
            product.showDesc();
        })
    }
}
