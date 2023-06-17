const express = require('express');
const router = express.Router();
const {getTasks, postTasks, updateTasks, deleteTasks} = require('./controllers/taskController');


router.get('/', getTasks),
router.post('/', postTasks)
router.put('/:id', updateTasks)
router.delete('/:id', deleteTasks)

module.exports = router
