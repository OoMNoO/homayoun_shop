const express = require("express");
const fs = require("fs");
const { v4 } = require("uuid");
const { randomBytes } = require("crypto");
const router = express.Router();

router.post("/logout", async (req, res) => {
  request = req.body;
  if (!request["token"]) {
    res.status(401).json({ error: "token not provided" });
  }
  console.log(request);
  console.log("logout");
  let rawdata = fs.readFileSync("./db.json");
  let db_data = JSON.parse(rawdata);
  let auth = db_data["auth"];
  let token = request["token"];
  if (auth[token]) {
    delete auth[token];
    let data = JSON.stringify(db_data, undefined, 4);
    fs.writeFileSync("./db.json", data);
    res.status(200).send({ message: "user logged out" });
  } else {
    res.status(404).json({ error: "no login session found!" });
  }
  return;
});

router.post("/login", async (req, res) => {
  request = req.body;
  if (!request["username"]) {
    res.status(401).json({ error: "username not provided" });
  }
  if (!request["password"]) {
    res.status(401).json({ error: "password not provided" });
  }
  console.log(request);
  console.log("login");
  let rawdata = fs.readFileSync("./db.json");
  let db_data = JSON.parse(rawdata);
  let users = db_data["users"];
  let auth = db_data["auth"];
  let user_found = false;
  let user_data = {};
  users.forEach((user) => {
    if (
      user["username"] == request["username"] &&
      user["password"] == request["password"]
    ) {
      user_found = true;
      user_data = user;
    }
    console.log(user_found);
  });
  console.log(user_found);
  if (!user_found) {
    res.status(404).json({ error: "username or password are incorrect!" });
  } else {
    let token = randomBytes(12).toString("hex");
    auth[token] = {
      id: user_data["id"],
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    };
    console.log(users);
    console.log(auth);
    let data = JSON.stringify(db_data, undefined, 4);
    fs.writeFileSync("./db.json", data);
    delete user_data["password"];
    res.status(200).send({ token: token, user_data: user_data });
  }
  return;
});

router.post("/signup", (req, res) => {
  request = req.body;
  if (!request["username"]) {
    res.status(401).json({ error: "username not provided" });
  }
  if (!request["password"]) {
    res.status(401).json({ error: "password not provided" });
  }
  if (!request["name"]) {
    res.status(401).json({ error: "name not provided" });
  }
  if (!request["email"]) {
    res.status(401).json({ error: "email not provided" });
  }
  if (!request["address"]) {
    res.status(401).json({ error: "address not provided" });
  }
  console.log(request);
  console.log("signup");
  let rawdata = fs.readFileSync("./db.json");
  let db_data = JSON.parse(rawdata);
  let users = db_data["users"];
  let user_found = false;
  users.forEach((user) => {
    if (user["username"] == request["username"]) {
      user_found = true;
    }
  });
  if (user_found) {
    res
      .status(404)
      .json({ error: "a user with this username already exsits!" });
    return;
  }
  let auth = db_data["auth"];
  let user_data = {
    id: v4(),
    username: request["username"],
    password: request["password"],
    name: request["name"],
    email: request["email"],
    address: request["address"],
  };
  users.push(user_data);
  let token = randomBytes(12).toString("hex");
  auth[token] = {
    id: user_data["id"],
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
  };
  console.log(users);
  console.log(auth);
  let data = JSON.stringify(db_data, undefined, 4);
  fs.writeFileSync("./db.json", data);
  delete user_data["password"];
  res.status(200).send({ token: token, user_data: user_data });
  return;
});

router.get("/products", (req, res) => {
  console.log("products");
  let rawdata = fs.readFileSync("./db.json");
  let db_data = JSON.parse(rawdata);
  let products = db_data["products"];
  console.log(products);
  if (products) {
    res.status(200).send({ products: products });
  } else {
    res.status(404).json({ error: "no products found!" });
  }
  return;
});

router.get("/product/:product", (req, res) => {
  const product_id = req.params.product;
  if (!product_id) {
    res.status(401).json({ error: "product id not provided" });
  }
  console.log(`Details of product ${product_id}`);
  let rawdata = fs.readFileSync("./db.json");
  let db_data = JSON.parse(rawdata);
  let products = db_data["products"];
  let product_found = false;
  let product_data = {};
  products.forEach((product) => {
    if (product["id"] == product_id) {
      product_found = true;
      product_data = product;
    }
    console.log(product_found);
  });
  console.log(product_found);
  if (!product_found) {
    res.status(404).json({ error: "product not found!" });
  } else {
    console.log(product_data);
    res.status(200).send({ product_data: product_data });
  }
  return;
});

router.get("/search/:search_text?", (req, res) => {
  let search_text = req.params.search_text || "";
  console.log(`search for: ${search_text}`);
  console.log(search_text == "");
  let rawdata = fs.readFileSync("./db.json");
  let db_data = JSON.parse(rawdata);
  let products = db_data["products"];
  console.log(products);
  let search_products = [];
  if (search_text != "") {
    products.forEach((product) => {
      search_text = search_text.toLowerCase();
      let product_name = product["name"].toLowerCase();
      if (product_name.includes(search_text)) {
        search_products.push(product);
      }
    });
  } else {
    search_products = products;
  }
  console.log(search_products);
  if (search_products) {
    res.status(200).send({ products: search_products });
  } else {
    res.status(404).json({ error: "no products found!" });
  }
  return;
});

module.exports = router;
