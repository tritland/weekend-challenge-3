$(document).ready(function(){
    $('#addTaskButton').on('click', function (){
    newTask = $('#taskInput').val();
    var objectToSend = {
      task: newTask,
    };
    console.log(objectToSend);
    // call saveKoala with the new obejct
    //saveKoala(objectToSend);

    })
});