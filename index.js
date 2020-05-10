const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 8080
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

let db

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

MongoClient.connect('mongodb://localhost:27017/animals', (err, database) => {
  if (err) {
    throw err;
  }
  db = database.db("animals")
  app.listen(port, () => console.log(`Example app listening on port ${port}!!`))
})

app.use((req, res, next) => {
  req.db = db;
  next();
});

require('./controllers/dog')(app);
require('./controllers/user')(app);


app.get('/', (req, res) => {
})





