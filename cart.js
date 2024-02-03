import { User } from "./user.js";
import { Product } from "./product.js";

export default class Cart {

  static fromObject(obj) {
    const cart = new Cart();
    cart.items = obj.items;
    return cart;
  }

  static parse(json) {
    const obj = JSON.parse(json); //{items: "{a:1}"}
    return Cart.fromObject(obj);
  }

  static getCartFromStorage() {
    // assuming user logged in
    const user = User.getCurrentUser();
    return user.cart;
  }

  static setCartToStorage(cart) {
    const user = User.getCurrentUser(); // copying to memory from storage
    user.cart = cart;
    User.setCurrentUser(user);
  }

  constructor() {
    this.items = {};
  }

  toString() {
    const cartObj = { items: JSON.stringify(this.items) };
    // console.log(cartObj);
    return JSON.stringify(cartObj);
  }

  getTotalPrice() {
    let price = 0;
    for (const id in this.items) {
      const quantity = this.items[id];
      const product = Product.getInfo(id);
      price += product.price * quantity;
    }
    return price;
  }

  incQuantity(productId, quantity = 1) {
    if (!this.items[productId]) {
      this.items[productId] = 0;
    }
    this.items[productId] += quantity;
    Cart.setCartToStorage(this);
  }

  decQuantity(productId, quantity = -1) {
    this.items[productId] += quantity;
    if (this.items[productId] < 1) {
      delete this.items[productId];
    }
    Cart.setCartToStorage(this);
  }

  addItem(productId) {
    this.incQuantity(productId);
    Cart.setCartToStorage(this);
  }

  removeItem(productId) {
    delete this.items[productId];
    Cart.setCartToStorage(this);
  }

  emptyCart() {
    this.items = {};
    Cart.setCartToStorage(this);
  }
}

export function showCartItem(product, quantity) {

  const { name, desc, price, image, id } = product;

  return `<div class="product ">
          <img src="${image}" width="100"/>
          <div class="product-info">
            <h3 class="product-name" >${name}</h3>
            <p class="product-price">Price: ${price}</p>
            <p class="product-price">Quantity: <span id="quantity_${id}"> ${quantity} </span>
              <button class="btn add" id="dec_btn_${id}">-</button>
              <button class="btn view" id="inc_btn_${id}">+</button>
            </p>
          </div>
          <div class="product-desc">
            <button class="btn add" id="del_btn_${id}">Delete</button>
            <button class="btn view" id="view_desc_btn_${id}">View Desc</button>
          </div>
        </div>`;
}

export function checkout() {
  const user = User.getCurrentUser();
  const totalPrice = user.cart.getTotalPrice();
  const accepted = confirm(`You've to pay ${totalPrice}. Ok to proceed.`);
  if (accepted) {
    alert("Thank you for shopping!");
    user.cart.emptyCart();
    window.location.href = "/dash.html";
  }
}