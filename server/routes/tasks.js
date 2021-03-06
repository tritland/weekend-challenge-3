var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.post('/', function (req, res) {
    console.log('hit post route');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error connecting to the database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('INSERT INTO tasks ( task_list, completed ) VALUES ($1, $2)', [req.body.task, req.body.completed], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            })
        }
    })
});

router.get('/', function (req, res) {
    console.log('hit get route')
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM tasks;', function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            })
        }
    })
});

router.delete('/:id', function (req, res) {
    var taskId = req.params.id;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error connecting to the database', errorConnectingToDatabase);
            res.send(500);
        } else {
            client.query("DELETE FROM tasks WHERE id=$1", [taskId], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('error making query', errorMakingQuery)
                    res.send(500)
                } else {
                    res.sendStatus(200);
                }
            })
        }
    })
});

router.put('/:id', function (req, res) {
    var tasksId = req.params.id;
    console.log('put route hit')
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error connecting to the database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query("UPDATE tasks SET completed = 'Y' WHERE id = $1;", [tasksId], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            })
        }
    })
});

module.exports = router