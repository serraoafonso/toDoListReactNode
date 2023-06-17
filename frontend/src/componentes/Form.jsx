import '../Global.css'
import React, { useEffect, useState } from 'react'


function Form(){
  
  const [tasks, setTasks] = useState([])
  const [currentTask, setCurrentTask] = useState('') 
  const [status ,setStatus] = useState('')
  async function getTasks(){
    const response = await fetch('http://localhost:4000');
    const task = await response.json()
    setTasks(task)
    console.log(tasks, 'tasks')    
  }

  const postTasks= async(event)=>{
    event.preventDefault()
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
  useEffect(()=>{getTasks()}, [])
    return(
        <>
        <main>
          <form>
            <input type="text" placeholder='Adicone uma nova tarefa' className='novaTarefa a' onChange={((e)=>setCurrentTask(e.target.value))}/>
            <button type="button"className='a btn' onClick={postTasks}>Enviar</button>
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
              <td>{task.task}</td>
              <td>
                <select>
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
              <button className="btn-action edit">
                    <span className="material-symbols-outlined">
                        edit
                        </span>
                  </button>
                  <button className="btn-action delete">
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