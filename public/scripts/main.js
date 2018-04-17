console.log("sanity check");

var $taskList;
var allTask = [];

$(document).ready(function() {

  $taskList = $('#todoTarget');
  $.ajax({
    method: 'GET',
    url: '/api/todo',
    success: handleSuccess,
    error: handleError,
  });

  $('#newTaskForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/todo',
      data: $(this).serialize(),
      success: newTodoSuccess,
      error: newTodoError
    });
  });

  $taskList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/todo/' + $(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: 'api/todo/' + $(this).attr('data-id'),
      success: deleteTaskSuccess,
      error: deleteTaskError,
    });
  });

});

function getTask(task) {
  return `<hr>
          <p>
              <b>${todo.task}</b>
              info ${todo.description}
              <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${todo._id}>Delete</button>
            </p>`;
}

function getAllTask(task) {
  return task.map(getTask).join("");
}


function render () {
  $taskList.empty();

  var taskTodo = getAllTask(allTask);

  $taskList.append(taskTodo);
};

function handleSuccess(json) {
  allTask = json;
  render();
}

function handleError(e) {
  console.log('shit');
  $('#todoTarget').text('Failed to load tasks, is the server working?');
}

function newTodoSuccess(json) {
  $('#newTaskForm input').val('');
  allTask.push(json);
  render();
}

function newTodoError() {
  console.log('new todo task error');
}

function deleteTaskSuccess(json) {
  var task = json;
  console.log(task);
  var taskId = todo._id;
  console.log('delete task', taskId);

  for(var index = 0; index < allTask.length; index++) {
    if(allTask[index]._id === taskId) {
      allTask.splice(index, 1);
      break;
    }
  }
  render();
}

function deleteTaskError() {
  console.log('delete task error');
}
