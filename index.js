const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 8080
const MongoClient = require('mongodb').MongoClient
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

let db
//maybe use cache?


//TODO: use controllers and models

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

app.post('/dog', (req, res) => {
  const dogs = req.db.collection("Dogs")

  let dog = {
    src: req.body.src,
    type: req.body.type,
    city: req.body.city,
    breed: req.body.breed
  }

  dogs.save(dog)
  res.end()
})

app.get('/dogs', (req, res) => {
  const dogs = req.db.collection("Dogs")

  dogs.find().toArray((err, dogs) => {
    if(err) throw err
    res.status(200).json(dogs)
  })
})




app.get('/', (req, res) => res.send('Hello!'))



