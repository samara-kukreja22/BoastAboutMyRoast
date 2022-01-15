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

function readAuthors(){
  //read the authors and return
  let authors = JSON.parse(fs.readFileSync('data/authors.json'));
  return authors;
}
function writeAuthors(authors){
  fs.writeFileSync('data/authors.json', JSON.stringify(authors));
}

function readPosts(){
  let posts  = JSON.parse(fs.readFileSync('data/blogPost.json'));
  return posts;
}
function writePosts(posts){
  fs.writeFileSync('data/blogPost.json', JSON.stringify(posts));
}

app.get('/', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("index");
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
app.get('/authors', function(request, response) {//specific authors
  let authors = JSON.parse(fs.readFileSync('data/authors.json'));
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("authors", {
      title: "List of Authors",
      authors: authors
    });
});

app.get('/author/:name', function(request, response) {//specific authors
  let name = request.params.name;
  let authors = JSON.parse(fs.readFileSync('data/authors.json'));
  let posts  = JSON.parse(fs.readFileSync('data/blogPost.json'));
  if(authors[name]){//if it exists
    let author = authors[name];//gets individual author
    authorPosts = [];
    for(postNum of author.posts){//id of each post of the author
      let post = posts.blogPosts[postNum];//documents.key[list of posts]
      authorPosts.push(post);
    }
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("author", {
      title: "Author",
      author: author,
      posts: authorPosts
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

app.get('/blogPost', function(request, response) {
    let posts  = JSON.parse(fs.readFileSync('data/blogPost.json'));
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("blogPost", {
      title: "Blog Posts",
      posts: posts.blogPosts
    });
});
/*
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
});*/

app.get('/blogPost/:index/upVote', function(request, response) {
    let posts = readPosts();
    let authors = readAuthors();
    let index = request.params.index;
    if(index < posts.blogPosts.length){
      //find the blog Posts
      let post = posts.blogPosts[index];
      //get author from post
      let author = post.author;
      //increase the authors upVotes
      authors[author].upVotes+=1;
      //write the authors back to file
      writeAuthors(authors);
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.redirect("/author/" + author);
    }
  else{
    response.status(404);
    response.setHeader('Content-Type', 'text/html')
    response.render("error", {
      "errorCode":"404"
    });
  }
});

app.get('/blogPost/:index/downVote', function(request, response) {
  let posts = readPosts();
  let authors = readAuthors();
  let index = request.params.index;
  if(index < posts.blogPosts.length){
    //find the blog Posts
    let post = posts.blogPosts[index];
    //get author from post
    let author = post.author;
    //increase the authors upVotes
    authors[author].downVotes+=1;
    //write the authors back to file
    writeAuthors(authors);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.redirect("/author/" + author);
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
  //calculate the popularity percentage
  let authors = readAuthors();
  //make a list to hold sorted Authors in the form of (score, author)
  let scores = [];
  for(let [name, data] of Object.entries(authors)){
    let score = 0;
    let total = data.upVotes + data.downVotes;
    if(total > 0){
      score = data.upVotes/total;
    }
    let ratio = [score,name];
    scores.push(ratio);
  }
  //sort the information
  scores.sort();
  scores.reverse();
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("popularity", {
    title: "Popularity",
    scores: scores
  });
});

app.get('/blogPostCreate', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("blogPostCreate");

//  else{
    response.status(404);
    response.setHeader('Content-Type', 'text/html')
    response.render("error", {
      "errorCode":"404"
    });
  //}
});

app.post('/blogPostCreate', function(request, response) {
  //choose from which author to add
  //type in a title
  //link a photo
  //choose a type of food it is
  //list of ingredients
  //type in instructions

  //  else{
      response.status(400);
      response.setHeader('Content-Type', 'text/html')
      response.render("error", {
        "errorCode":"400"
      });
  //  }
});

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
