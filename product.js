function genRandomId() {
  return Math.floor(1000000 + Math.random() * 999999).toString(16);
}

export class Product {
  static PRODUCTS_LOC = "products";

  static initStorage() {
    const products = Product.getProductsFromStorage();
    if (!products) {
      localStorage.setItem(Product.PRODUCTS_LOC, "{}");
    }
  }

  static fromObject(obj) {
    const { name, desc, price, image, id } = obj;
    const product = new Product(name, desc, price, image);
    product.id = id;
    return product;
  }

  static parse(json) {
    const obj = JSON.parse(json);
    return Product.fromObject(obj);
  }

  static addProductToStorage(product) {
    const products = Product.getProductsFromStorage();
    products[product.id] = product.toString();
    localStorage.setItem(Product.PRODUCTS_LOC, JSON.stringify(products));
  }

  static getInfo(id) {
    const productsObj = Product.getProductsFromStorage();
    const productData = productsObj[id];
    if (!productData) return null;
    return Product.parse(productData);
  }

  static getProductsFromStorage() {
    return JSON.parse(localStorage.getItem(Product.PRODUCTS_LOC));
  }

  constructor(name, desc, price, image) {
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.image = image;
    this.id = genRandomId();
  }

  toString() {
    return JSON.stringify(this);
  }

  showDesc() {
    alert(`This product have following desc:
    ${this.desc}`);
  }

  showProduct() {
    const { name, desc, price, image, id } = this;

    return `<div class="product">
          <img src="${image}" width="100"/>
          <div class="product-info">
            <h3 class="product-name" >${name}</h3>
            <p class="product-price">Price: ${price}</p>
          </div>
          <div class="product-desc">
            <button class="btn add" id="add_cart_btn_${id}">Add To Cart</button>
            <button class="btn view" id="view_desc_btn_${id}">View Desc</button>
          </div>
        </div>`;
  }
}