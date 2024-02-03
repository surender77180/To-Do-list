import Cart from "./cart.js";

export class User {
    static CRNT_USER_LOC = "crnt_user";
    static USERS_LOC = "users";

    static initStorage() {
        const users = User.getUsersFromStorage();
        if (!users) {
            localStorage.setItem(User.USERS_LOC, "{}")
        }
    }

    static removeCurrentUser() {
        const user = User.getCurrentUser();
        User.addToStorage(user);
        localStorage.removeItem(User.CRNT_USER_LOC);
    }

    static setCurrentUser(user) {
        localStorage.setItem(User.CRNT_USER_LOC, user.toString());
    }

    static getCurrentUser() {
        return User.parse(localStorage.getItem(User.CRNT_USER_LOC));
    }

    static isLogged() {
        const user = localStorage.getItem(User.CRNT_USER_LOC);
        return !!user
    }

    static isAdmin() {
        return User.isLogged() && User.getCurrentUser().role === User.roles.admin;
    }

    static fromObject(obj) {
        const name = obj.name;
        const password = obj.password;
        const role = obj.role;
        const cart = obj.cart;

        if (!name || !password) return null;
        else {
            const user = new User(name, password, role);
            user.cart = Cart.fromObject(cart);
            return user;
        }
    }

    static parse(json) {
        const obj = JSON.parse(json);
        return User.fromObject(obj);
    }

    static addToStorage(user) {
        const users = User.getUsersFromStorage();
        users[user.name] = user.toString();
        localStorage.setItem(User.USERS_LOC, JSON.stringify(users));
    }

    static getUsersFromStorage() {
        return JSON.parse(localStorage.getItem(User.USERS_LOC));
    }

    static getInfo(name) {
        const usersObj = User.getUsersFromStorage();
        const userData = usersObj[name];
        if (!userData) return null;
        return User.parse(userData);
    }

    static isValidUser(user, warn = false) {
        const parsedUser = User.getInfo(user.name);
        if (!parsedUser) {
            if (warn) alert("user not found!!");
        } else {
            if (user.password != parsedUser.password) {
                if (warn) alert("wrong password");
            } else {
                return true;
            }
        }
        return false;
    }

    static roles = {
        admin: "admin",
        customer: "customer"
    }

    constructor(name, password, role = User.roles.customer) {
        this.name = name.toLowerCase();
        this.password = password;
        this.cart = new Cart();
        this.role = role;
    }
    toString() {
        return JSON.stringify(this);
    }
}
