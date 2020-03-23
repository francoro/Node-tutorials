const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 8080
const MongoClient = require('mongodb').MongoClient
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

let db
//maybe use cache?

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //  res.setHeader('Access-Control-Allow-Credentials', false);

  // Pass to next layer of middleware
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

app.get('/', (req, res) => res.send('Hello!'))



