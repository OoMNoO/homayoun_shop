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
    delete  user_data["password"]
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
  if (!(req.body['name'])){
    res.status(401).json({ error: "name not provided" });
  }
  if (!(req.body['email'])){
    res.status(401).json({ error: "email not provided" });
  }
  if (!(req.body['address'])){
    res.status(401).json({ error: "address not provided" });
  }
  console.log(req.body)
  console.log("signup")
  let rawdata = fs.readFileSync('./db.json');
  let db_data = JSON.parse(rawdata);
  let users = db_data["users"]
  let user_data = req.body
  users.push(user_data)
  console.log(users)
  let data = JSON.stringify(db_data, undefined, 4);
  fs.writeFileSync('./db.json', data);
  delete  user_data["password"]
  res.status(200).send({ user_data: user_data });
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