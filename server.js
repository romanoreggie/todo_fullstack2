var express = require('express');
var Todo = require('./models/todo');

var app = express();

app.use(express.static('public'));

var port = 3000;

var todo = require('./models/todo.js')

  var today = new todo({
      task: "Finish lab",
      description: "full stack todo list"
  });

  today.save(function(err, newTodo){
    if(err) {return console.log(err);}
    console.log("saved new todo:  ", newTodo);
  });

app.get('/', function(req, res) {
  res.sendFile('views/index.html', { root : __dirname});
});


app.listen(port, ()=> {
  console.log(`Im listening`);
});
