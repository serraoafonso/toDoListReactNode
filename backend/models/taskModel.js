const connection = require('./connection')

const getTaks = async()=>{
  const tasks = await connection.execute('SELECT task, status, date, id FROM tasks')
  return tasks[0]
}                                                                           
const postTasks = async(task)=>{
    await connection.execute('INSERT INTO tasks (task) VALUES (?)', [task]);
}

const updateTasks = async(task, id)=>{
    await connection.execute('UPDATE tasks SET task = ? WHERE id = ?', [task, id])
}

const deleteTasks = async(id)=>{
    await connection.execute('DELETE FROM tasks WHERE id = ?', [id])
}
const changeStatus = async(status, id)=>{
    await connection.execute('UPDATE tasks SET status = ? WHERE id = ?', [status, id])
}


module.exports = {getTaks, postTasks, updateTasks, deleteTasks, changeStatus}