$(document).ready(function () {
    getTasks();

    $('#addTaskButton').on('click', function () {
        newTask = $('#taskInput').val();
        var objectToSend = {
            task: newTask,
            completed: 'N'
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

    $('#viewTasks').on('click', '.checkBox', function () {
        var rowId = $(this).parent().parent().data().id;
        $.ajax({
            type: 'PUT',
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

        if (task.completed == "N") {
            var $taskRow = $('<tr><td>' + task.task_list + '</td><td align = "center"><input class="checkBox" type="checkbox"></td><td align = "center"><button class="deleteButton"> Delete </button></td></tr>');

            $('#viewTasks').append($taskRow);

        } else {
            var $taskRow = $('<tr class = "completedRow"><td>' + task.task_list + '</td><td align = "center"><span class="checkMark">&#10003</span></td><td align = "center"><button class="deleteButton"> Delete </button></td></tr>');

            $('#viewTasks').prepend($taskRow);

            $('.completedRow').css('background-color', '#9bf28a');
        }

        $taskRow.data('id', task.id);
    }
};