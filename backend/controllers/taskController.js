const taskModel = require('../models/taskModel')

const getTasks = async(req, res)=>{    
    try{
        const tasks = await taskModel.getTaks()
        return res.status(200).json(tasks)
    }catch(err){
        res.status(404).json("Erro")
    }
}

const postTasks = async(req, res)=>{
    const task = req.body.task;
    try{
        await taskModel.postTasks(task)
        return res.status(200).json("Task created")
    }catch(err){
        res.status(404).json('Erro')
    }
}

const updateTasks = async(req, res)=>{
  const {id} = req.params;
  const task = req.body.task;
  try{
    await taskModel.updateTasks(task, id);
    return res.status(200).json('Task updated')
  }catch(err){
    res.status(404).json('Erro')
  }
}

const deleteTasks = async(req, res)=>{
    const {id} = req.params;
    try{
        await taskModel.deleteTasks(id);
        return res.status(200).json('task Deleted')
    }catch(err){
        res.status(404).json('Erro')
    }
}

const changeStatus = async(req, res)=>{
    const id = req.params.id;
    const {status} = req.body;
    try{
        await taskModel.changeStatus(status, id)
        return res.status(200).json('Status updated')
    }catch(err){
        res.status(404).json('Erro')
    }
}

module.exports = {getTasks, postTasks, updateTasks, deleteTasks, changeStatus}