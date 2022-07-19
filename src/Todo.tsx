import React,{ useState ,useEffect } from "react"; 
import { useNavigate  } from "react-router-dom";
import axios from "./api/axios";



const AddTaskForm = ({ addTask }:any) => {
  const [value, setValue] = useState("");

  const handleSubmit = (event:React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    value && addTask(value)
    setValue("");
  };

  return (
   
    <div className="head">
        <div  >
      <h1>All Tasks</h1>
      <input
        type="text"
        value={value}
        className="textinput" placeholder="Add a new task"
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit" className="button" onClick={handleSubmit}>Add</button>
    </div>
    </div>
  );
}

const Todo = () => {

  const [tasks, setTasks] = useState([]);
  const GET_TASKS='/api/v1/todos'

  useEffect(()=>{
     
       getTasks();
  },[])
   

  async function getTasks(){
    const response = await axios.get(
      GET_TASKS,
      {
        headers: { "Authorization":`Bearer ${localStorage.getItem("token")}`},
       
      }
    );
    setTasks(response.data.todos)
   }

   const CREATE_TASK='/api/v1/todos/'
  const addTask = async (description:string) => { 
     
    try{
        await axios.post(
        CREATE_TASK, 
       { description },
        {
          headers: {
             "Authorization":`Bearer ${localStorage.getItem("token")}`,
             "Content-Type": "application/json"
          },
         
        })
        getTasks();
      }catch(err){
          console.log(err);
      }
  } 
  const UPDATE_TASK='/api/v1/todos/'
  
  const updateTask = async (id:string,completed:boolean) => { 
     
    try{
        await axios.patch(
          `${UPDATE_TASK}${id}`,
       {completed},
        {
          headers: {
             "Authorization":`Bearer ${localStorage.getItem("token")}`,
             "Content-Type": "application/json"
          },
         
        })
        getTasks();
      }catch(err){
          console.log(err);
      }
  } 

  const DELET_TASK='/api/v1/todos/'
  const deleteTask = async (id:string | number) => { 
     
    try{
        await axios.delete(
          `${DELET_TASK}${id}`,
         
       
        {
          headers: {
             "Authorization":`Bearer ${localStorage.getItem("token")}`,
             "Content-Type": "application/json"
          },
         
        })
        getTasks();
      }catch(err){
          console.log(err);
      }
  } 
  

  const navigate =useNavigate();

    const onCheckBoxChange =(e:React.ChangeEvent<HTMLInputElement>) =>{
    const {id,checked} =e.target
    updateTask(id,checked);
  }

  const onDelete =(e: React.MouseEvent<HTMLElement>)=>{
    const {id} = e.currentTarget
    deleteTask(id);
  }

  const logout = ()=>{
      navigate('/');
      localStorage.getItem('')
  }

  return (

    
    <>
    <div className="top">
       <div> <h3>Todos</h3>
       <button className="logbtn" onClick={logout}>Logout</button>
       </div>
       </div>
       
    
    <div>  <AddTaskForm addTask={addTask} /></div>
    <div className="todo-list">
      {tasks.map((task:any, index) => (
        <ul className="ul"> <div className={task.completed ? "todo-text todo-completed" : "todo-text"}>
          <li className="list">
        <div className="list-items"><input id={task.id} type="checkbox" checked={task.completed} onChange={onCheckBoxChange}  className="checkbox"  />
          <span >{task.description}</span></div>
          <button onClick={onDelete} id={task.id} className="deletebtn"><i className="fa fa-trash"></i></button>
        
        </li></div>
        </ul>
        
      ))}
    </div>
    
           {tasks.length === 0 && <h2 id="h2">Seems like a quiet day</h2>}
        
           </>
  );
}

export default Todo


