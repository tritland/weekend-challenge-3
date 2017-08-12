$(document).ready(function () {
    getTasks();

    $('#addTaskButton').on('click', function () {
        newTask = $('#taskInput').val();
        var objectToSend = {
            task: newTask,
        };
        saveTask(objectToSend);
    });

});

function saveTask(newTask) {
    $.ajax({
        url: '/tasks',
        method: 'POST',
        data: newTask,
        success: function (response) {
            console.log(response);
            getTasks(); //gets updated task table
            $('#taskInput').val(''); //clears input field
        }
    });
};

function getTasks() {
    $.ajax({
        url: '/tasks',
        method: 'GET',
        success: function (response) {
            showTasks(response);
        }
    });
};

function showTasks(tasks) {
    $('#viewTasks').empty();
    console.log(tasks);
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var $taskRow = $('<tr><td>' + task.task_list + '</td><td><input class="checkBox" type="checkbox"></td><td><button class="deleteButton"> Delete </button></td></tr>');

        $('#viewTasks').append($taskRow);
    }
};