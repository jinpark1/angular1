require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true })
  .then( () => {
    console.log('Connected to database!')
  })
  .catch( () => {
    console.log('Connection failed!');
  })

app.use(bodyParser.json());

app.use( (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    { id: 'asfdafio',
      title: 'First server-side post',
      content: 'This is coming from server'
    },
    { id: 'asfdaasdfa23fio',
      title: 'Second server-side post',
      content: 'This is coming from server!!'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  })
});



module.exports = app;
