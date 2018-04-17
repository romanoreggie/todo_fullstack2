var db = require('./mopdels/todo.js');

var todo_list = [
  {
    task: "complete todo list",
    description: "Finish your first full stack project the todo list"
  },
  {
    task: "catch up on work",
    description: "Catch up on all the work missed monday"
  },
];

db.Todo.remove({}, function(err, task){
  if(err) {
    console.log('Error occured in remove', err);
  } else {
    console.log('Removed all task');

    db.Todo.create(books_list, function(err, task){
      if (err) { return console.log('err', err); }
      console.log("created", task.length, "task");
      process.exit();
    })
  }
})
