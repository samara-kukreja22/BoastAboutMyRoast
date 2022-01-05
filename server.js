const express = require('express');
const fs = require('fs');
const ejs = require('ejs');

//..............Create an Express server object..................//
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public')); //specify location of static assests
app.set('views', __dirname + '/views'); //specify location of templates
app.set('view engine', 'ejs'); //specify templating library

app.get('/', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("index");
});

app.get('/blogPost/:index', function(request, response) {
  let index = request.params.index;
  let blogPosts = JSON.parse(fs.readFileSync('data/blogPost.json'));
  if(blogPosts.blogPosts[index]){//if it exists
    let post = blogPosts.blogPosts[index];//gets individual posts
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("blogPost", {
      post: post
    });
  }
  else{
    response.status(404);
    response.setHeader('Content-Type', 'text/html')
    response.render("error", {
      "errorCode":"404"
    });
  }
});
/*
/author/name of the author(variable)
/blogPost/index of blogPost in the list
/submit
/result(of submit)
/blogPost/index/upVote
/blogPost/index/downVote
/popularity
*/
app.get('/author', function(request, response) {
  let index = request.params.index;
  let authors = JSON.parse(fs.readFileSync('data/authors.json'));
  if(authors.authors[index]){//if it exists
    let author = author.authors[index];//gets individual author
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("author", {
      author: author 
    });
  }
  else{
    response.status(404);
    response.setHeader('Content-Type', 'text/html')
    response.render("error", {
      "errorCode":"404"
    });
  }
});
// Because routes/middleware are applied in order,
// this will act as a default error route in case of
// a request fot an invalid route
app.use("", function(request, response){
  response.status(404);
  response.setHeader('Content-Type', 'text/html')
  response.render("error", {
    "errorCode":"404"
  });
});


//..............Start the server...............................//
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started at http://localhost:'+port+'.')
});
