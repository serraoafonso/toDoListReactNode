import '../Global.css'
import React, { useEffect, useState } from 'react'


function Form(){
  
  const [tasks, setTasks] = useState([])
  const [currentTask, setCurrentTask] = useState('') 
  const [status ,setStatus] = useState('')
  const [edit, setEdit] = useState(false)
  const [currentEdit, setCurrentEdit] = useState('')
  const [idTask, setIdTask] = useState('')
  const [idEditar, setIdEditar] = useState()
  async function getTasks(){
    const response = await fetch('http://localhost:4000');
    const task = await response.json()
    setTasks(task)
    console.log(tasks, 'tasks')    
  }
  const postTasks= async(event)=>{
    event.preventDefault()
    setCurrentTask('')
    const bodyTask = {
      task: currentTask
    }
    await fetch('http://localhost:4000/', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(bodyTask)  
    })
    getTasks()
  }
  const deleteTasks = async(id)=>{
    //event.preventDefault();
    console.log(id)
    await fetch(`http://localhost:4000/${id}`, {
      method: 'delete'
    })
    getTasks()
  }
  function poeEdit(){
     return(
      <form onSubmit={acabaEdit}>
      <input type="text" className='inputEdit' onChange={(e)=>setCurrentEdit(e.target.value)} value={currentEdit}/>
      </form>
     )
  }
  
  const acabaEdit = async () => {
    
    const bodyTask = {
      task: currentEdit
    };
    await fetch(`http://localhost:4000/${idTask}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyTask)
    });
    setCurrentEdit('');
    getTasks();
  };
  
  function preparaEdit(task){
    setIdTask(task.id)
    setCurrentEdit(task.task)
    setEdit(true)
    setIdEditar(task.id)
  }
  async function changeStatus(status, id){
    const body = {
      status: status
    }
    await fetch(`http://localhost:4000/status/${id}`,{
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
  }
  useEffect(()=>{getTasks()}, [])
    return(
        <>
        <main>
          <form onSubmit={postTasks} className='form'>
            <input type="text" placeholder='Adicone uma nova tarefa' className='novaTarefa a' onChange={((e)=>setCurrentTask(e.target.value))} value={currentTask}/>
            <button type="submit"className='a btn'>Enviar</button>
          </form>
           
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Status</th>
              <th>Criada em</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task,i)=>{
            return(
            <tr key={i}>
              <td>{ 
              (edit && task.id == idEditar) ? poeEdit() : task.task}</td>
              <td>
                <select onChange={(e)=>changeStatus(e.target.value, task.id)}>
                  {
                  task.status == 'pendente' ? 
                    
                      <><option value="pendente" selected>Pendente</option >
                      <option value="concluida">Concluída</option></> :
                      <><option value="pendente" >Pendente</option>
                      <option value="concluida" selected>Concluída</option></>
            }
                </select>
              </td>
              <td>{task.date.substring(0,10) + ' '+task.date.substring(11, 16) /*+ task.date.substring(12, 16).substring(0,10)*/}</td>
              <td className='acoes'>
              <button className="btn-action edit" onClick={()=>preparaEdit(task)}>{/*chamar sempre com arrow function*/} 
                    <span className="material-symbols-outlined">
                        edit
                        </span>
                  </button>
                  <button className="btn-action delete"  onClick={()=>deleteTasks(task.id)}>
                    <span className="material-symbols-outlined">
                        delete
                        </span>
                  </button>
              </td>
            </tr>)
})}
          </tbody>
        </table>
          </main>
        </>
    )
    
}

export default Form