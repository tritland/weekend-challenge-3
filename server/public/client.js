$(document).ready(function () {
    getTasks();

    $('#addTaskButton').on('click', function () {//creates new task object
        newTask = $('#taskInput').val();
        var objectToSend = {
            task: newTask,
            completed: 'N'
        };
        saveTask(objectToSend);
    });

    $('#viewTasks').on('click', '.deleteButton', function () {//deletes task after confirm

        if (confirm('Are you sure you want to delete this task?')) {

            var rowId = $(this).parent().parent().data().id;
            $.ajax({
                method: 'DELETE',
                url: '/tasks/' + rowId,
                success: function (response) {
                    getTasks();
                }
            });

        } else {
            return false;
        }
    });

    $('#viewTasks').on('click', '.checkBox', function () { //updates completed status to 'Y' in database
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

function saveTask(newTask) { //posts new task object to database
    $.ajax({
        url: '/tasks',
        method: 'POST',
        data: newTask,
        success: function (response) {
            getTasks();
            $('#taskInput').val(''); //clears input field
        }
    });
};

function getTasks() { //gets the latest table of tasks from database
    $.ajax({
        url: '/tasks',
        method: 'GET',
        success: function (response) {
            showTasks(response);
        }
    });
};

function showTasks(tasks) { //displays the tasks to the DOM and shows if task is complete or not
    $('#viewTasks').empty();
    console.log(tasks);
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];

        if (task.completed == "N") {
            var $taskRow = $('<tr><td>' + task.task_list + '</td><td align = "center"><input class="checkBox" type="checkbox"></td><td align = "center"><button class="deleteButton"> Delete </button></td></tr>');

            $('#viewTasks').prepend($taskRow);

        } else {
            var $taskRow = $('<tr class = "completedRow"><td>' + task.task_list + '</td><td align = "center"><span class="checkMark">&#10003</span></td><td align = "center"><button class="deleteButton"> Delete </button></td></tr>');

            $('#viewTasks').append($taskRow);

            $('.completedRow').css('background-color', '#9bf28a');
        }

        $taskRow.data('id', task.id); //asigns unique id to task row
    }
};