const express = require('express'),
      bodyParser = require('body-parser'),
      MongoClient = require('mongodb').MongoClient,
      app = express(),
      url = process.env.MONGODB_URL || 'mongodb://db/todos';
// Configure app to use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Connection to db on startup
let db = null;
MongoClient.connect(url, (err, conn) => {
  if(err){
    process.exit(1);
  } else {
    db = conn;
  }
});
// Define routes
// List all elements in the list
app.get('/todos', (req, res) => {
    db.collection('todo').find().toArray((err, result) => {
    if(err){
      return res.status(500).json({error: err.message});
    } else {
      return res.json({todos: result});
    }
  });
});
// Create a new element in the list
app.post('/todos', (req, res) => {
  let text = req.body.text;
    db.collection('todo').insert({text: text}, (err, result) => {
    if(err){
      return res.status(500).json({error: err.message});
    } else {
      return res.sendStatus(201);
    }
  });
});
app.listen(1337);
