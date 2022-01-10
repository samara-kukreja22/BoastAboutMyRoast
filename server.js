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

app.get('/author: name', function(request, response) {
  let name = request.params.index;
  let authors = JSON.parse(fs.readFileSync('data/authors.json'));
  if(authors.authors[name]){//if it exists
    let author = author.authors[name];//gets individual author
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

app.get('/blogPost/:upVote', function(request, response) {

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

app.get('/blogPost/:downVote', function(request, response) {

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

app.get('/popularity', function(request, response) {
  let authors = JSON.parse(fs.readFileSync('data/authors.json'));
  let authorArray = [];
  let blogPosts = JSON.parse(fs.readFileSync('data/blogPosts.json'));
  let post = blogPosts.blogPosts[index];//individual post
  //calculate the popularity percentage
  }
  else{
    response.status(404);
    response.setHeader('Content-Type', 'text/html')
    response.render("error", {
      "errorCode":"404"
    });
  }
});

app.get('/blogPostCreate', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("blogPostCreate");
  }
  else{
    response.status(404);
    response.setHeader('Content-Type', 'text/html')
    response.render("error", {
      "errorCode":"404"
    });
  }
});

app.post('/blogPostCreate', function(request, response) {
  //choose from which author to add
  //type in a title
  //link a photo
  //choose a type of food it is
  //list of ingredients
  //type in instructions

    else{
      response.status(400);
      response.setHeader('Content-Type', 'text/html')
      response.render("error", {
        "errorCode":"400"
      });
    }
});

app.post('/opponentCreate', function(request, response) {
    let opponentName = request.body.opponentName;
    let opponentPhoto = request.body.opponentPhoto;
    if(opponentName&&opponentPhoto){
      let opponents = JSON.parse(fs.readFileSync('data/opponents.json'));
      let newOpponent={
        "name": opponentName,
        "photo": opponentPhoto,
        "win":0,
        "lose": 0,
        "tie": 0,
      }
      opponents[opponentName] = newOpponent;
      fs.writeFileSync('data/opponents.json', JSON.stringify(opponents));

      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.redirect("/opponent/"+opponentName);
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
