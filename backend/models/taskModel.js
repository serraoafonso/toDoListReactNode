const connection = require('./connection')

const getTaks = async()=>{
  const tasks = await connection.execute('SELECT task, status, date, id FROM tasks')
  return tasks[0]
}                                                                           
const postTasks = async(task)=>{
    await connection.execute('INSERT INTO tasks (task) VALUES (?)', [task]);
}

const updateTasks = async(task, status, id)=>{
    await connection.execute('UPDATE tasks SET task = ?, status = ? WHERE id = ?', [task, status, id])
}

const deleteTasks = async(id)=>{
    await connection.execute('DELETE FROM tasks WHERE id = ?', [id])
}



module.exports = {getTaks, postTasks, updateTasks, deleteTasks}