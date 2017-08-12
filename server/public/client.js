$(document).ready(function () {
    getTasks();

    $('#addTaskButton').on('click', function () {
        newTask = $('#taskInput').val();
        var objectToSend = {
            task: newTask,
        };
        saveTask(objectToSend);
    });

    $('#viewTasks').on('click', '.deleteButton', function () {
        var rowId = $(this).parent().parent().data().id;
        $.ajax({
            method: 'DELETE',
            url: '/tasks/' + rowId,
            success: function (response) {
                getTasks();
            }
        })
    });

});

function saveTask(newTask) {
    $.ajax({
        url: '/tasks',
        method: 'POST',
        data: newTask,
        success: function (response) {
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

        $taskRow.data('id', task.id);

        $('#viewTasks').append($taskRow);
    }
};