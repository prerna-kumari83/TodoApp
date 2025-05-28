import { useState } from "react";
import "./TodoList.css";


import { v4 as uuidv4 } from 'uuid';

export default function TodoList() {
    

const [todoList, setTodoList] = useState([{task:"sample-task",id:uuidv4(),isDone:false}]);
const [newTask, setNewTask] = useState("");
const [doneMark,setDoneMark]=useState("Done");

function addTask() {
  if (newTask.trim() !== "") {
    setTodoList((prev)=>{
      return [...prev, {task:newTask,id:uuidv4(),isDone:false}]
    });
    setNewTask("");
  }
}


function updateTask(event) {
  setNewTask(event.target.value);
}

function deleteTask(id) {
  
  setTodoList((prev)=>(todoList.filter((prev) => prev.id !== id))) 
  // Updates the state
}

function upperAll(){
  setTodoList((prev)=>
      prev.map((todo)=>{
          return {...todo,task:todo.task.toUpperCase()}
      })
)
}


function updateOne(id){
  setTodoList((prev)=>
      prev.map((todo)=>{
          if(todo.id==id){
              return {...todo,task:todo.task.toUpperCase()};
          }
          else{
              return todo;
          }
  }))
}


function doneTask(id) {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );

    
  
    
  }
 

  return (
    <div className="todo-card">
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Enter tasks"
        onChange={updateTask}
        value={newTask}
      />
      &nbsp;&nbsp;
      <button onClick={addTask}>Add Task</button>
      <hr />
      <h2>LIST</h2>
      <hr />
      <ul>

        {
            todoList.map((tk)=>(

                tk.isDone?(
                <li key={tk.id} >
                    <span style={{ textDecoration: "line-through" }}>{tk.task}</span>&nbsp; &nbsp;
                    <button onClick={()=>deleteTask(tk.id)}>Delete</button> &nbsp;&nbsp;
                    {/* <button onClick={()=>updateOne(tk.id)}>Upper</button> */}
                    <button onClick={()=>doneTask(tk.id)  }     >Done</button>
                </li> ):(
                <li key={tk.id}>
                <span>{tk.task}</span>&nbsp; &nbsp;
                <button onClick={()=>deleteTask(tk.id)}>Delete</button> &nbsp;&nbsp;
                {/* <button onClick={()=>updateOne(tk.id)}>Upper</button> */}
                <button onClick={()=>doneTask(tk.id)}>{doneMark}</button>
            </li>)
                
              
            ))
        }
       
      </ul>
      <button onClick={upperAll}>UpperCase</button>
    </div>
  );
}
