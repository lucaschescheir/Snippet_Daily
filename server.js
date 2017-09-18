const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const mustache = require('mustache-express')

const fs = require('fs')
const app = express();

app.use(express.static('./public'));

app.use(bodyparser.urlencoded({
  extended: false
}));

app.engine('mustache', mustache());
app.set('views', './public');
app.set('view engine', 'mustache');
);

const User = require('./models/users')
const Snippet = require('./models/snippet')

mongoose.connect('mongodb://localhost:27017/user')

//register or log in page
app.get('/login', function(req, res) {

  res.render('login')
});

app.get('/log-in', function(req, res) {

  Snippet.find().then(function(snippet) {
    res.render('log-in', {
      snippetlist: snippet
    });
  });
});
//get route to look at snippet
app.get('/details/:item_id', function(req, res) {
  const id = req.params.item_id;
  console.log(req.body)
  Snippet.findOne({
    _id: id,
  }).then(function(result) {
    res.render('details', {
      item: result, // result from the database
    });
  })
});

//post after account register
app.post('/log', function(req, res) {
  //saves user info into database
  const user = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email,
  });
  user.save()
    .then(function() {
      res.redirect('/log-in')
      console.log(user.toObject())
    });
});

//post to get to sign in page
app.post('/sign-in', function(req, res) {

  res.render('sign-in', {

  });
});
//post to sign in with existing account
app.post('/log-in', function(req, res) {

  res.redirect('/log-in')
});

//post to create snippet
app.post('/create', function(req, res) {
  const snippet = new Snippet({
    title: req.body.title,
    body: req.body.body,
    notes: req.body.notes,
    language: req.body.language,
    tags: req.body.tags,
  });
  snippet.save()
    .then(function() {
      res.redirect('/log-in')
      console.log(snippet.toObject())
    })

});
//post to search snippet
app.post('/searchSnippet', function(req, res) {
  //how can i get this to work
  let query = {};
  query[req.body.searchFilter] = req.body.search;

  Snippet.find().then(function(snippet1) {

    Snippet.find(query)
      .then(function(snippet) {
        res.render('log-in', {
          searchResults: snippet,
          snippetlist: snippet1

        })
      });
  });
});

app.listen(3000);

console.log('connected!!');
