const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const routes = require('./routes');
app.use(express.static('frontend'));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})