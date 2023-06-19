const express = require('express');
const router = express.Router();
const {getTasks, postTasks, updateTasks, deleteTasks, changeStatus} = require('./controllers/taskController');


router.get('/', getTasks),
router.post('/', postTasks)
router.put('/:id', updateTasks)
router.delete('/:id', deleteTasks)
router.put('/status/:id', changeStatus)

module.exports = router
