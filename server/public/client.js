$(document).ready(function(){
    $('#addTaskButton').on('click', function (){
    newTask = $('#taskInput').val();
    var objectToSend = {
      task: newTask,
    };
    saveTask(objectToSend); //calls saveKoala function with new task object
    });

});

function saveTask(newTask){
    $.ajax({
        url: '/tasks',
        method: 'POST',
        data: newTask,
        success: function (response){
            console.log(response);
            getTasks(); //gets updated task table
            $('#taskInput').val(''); //clears input field
        }        
    });
};

function getTasks(){
 $.ajax({
    url: '/tasks',
    method: 'GET',
    success: function (response) {
      console.log('got these tasks: ', response);
      //showTasks(response);
    } 
  });
};