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
    //console.log('saveTask function contains', newTask)
    $.ajax({
        url: '/tasks',
        method: 'POST',
        data: newTask,
        success: function (response){
            console.log(response);
        }        
    });
};