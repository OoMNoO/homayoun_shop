const express = require('express');
const fs = require('fs');
const router = express.Router();

router.post('/login', async (req, res) => {
  request = req.body
  if (!(req.body['username'])){
    res.status(401).json({ error: "username not provided" });
  }
  if (!(req.body['password'])){
    res.status(401).json({ error: "password not provided" });
  }
  console.log(req.body)
  console.log("login")
  let rawdata = fs.readFileSync('./db.json');
  let db_data = JSON.parse(rawdata);
  let users = db_data["users"]
  let user_found = false
  let user_data = {}
  users.forEach(user => {
    if (user["username"] == req.body['username'] && user["password"] == req.body['password']){
      user_found = true;
      user_data = user
    }
    console.log(user_found);
  });
  console.log(user_found);
  if (!user_found){
    res.status(404).json({ error: "username or password are incorrect!" });
  } else {
    res.status(200).send({ user_data: user_data });
  }
  return;
});

router.post('/signup', (req, res) => {
  request = req.body
  if (!(req.body['username'])){
    res.status(401).json({ error: "username not provided" });
  }
  if (!(req.body['password'])){
    res.status(401).json({ error: "password not provided" });
  }
  console.log(req.body)
  console.log("login")
  res.status(200).send({ message: "logged in" });
  return;
});

router.get('/products', (req, res) => {
  res.send('List of products');
});

router.get('/product/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Details of product ${userId}`);
});

module.exports = router;