/*
  Component to list all tasks. TaskList finds the most up to date list of tasks
  and then prints them to the page using TaskItem, listed at the bottom of page. 
  Written by Vincent O
*/
import React, {useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { TaskContext } from "./TaskDataProvider"

export const TasksList = () => {
  /*
    The useContext hook allows you to use data structures and 
    functions that a parent provider component exposes.

  */
  const { getTasks, tasks, updateTask } = useContext(TaskContext)
  
  /*
    useEffect() allows for getting the data from somewhere else.
    The empty brackets [] are a dependency array and mean this 
    is only run at first load and never again because it's not given any trigger.
  */
  useEffect(() => {
    getTasks()
  }, [])
  
  /*
    Set a form display state to change when the add task form is rendered.
  */
  let [displayForm, setDisplayForm] = useState(false);

  /*
    useHistory is used to change the URL, triggering changes to the DOM
  */
  const history = useHistory()
  
  /*
    Using a ternary operator (way to write a condition in a return) to display the 
    add task form only when the displayForm state is TRUE. This is switched from
    default of false to true when the button is clicked to add a task.
    The conditional keeps the list of tasks open, and swaps the Add button for 
    the add form where user can input new tasks.
  */
    return (
      displayForm ?
      <>
      <h2>Tasks</h2>
      
      <TaskForm changeparentstate={setDisplayForm} />
            
      <div className="tasks-container">
        {
          tasks.filter(task => {
            return !task.completed
          }).map(task => {
            return <TaskItem key={task.id} task={task} />
          })
        }
      </div>
      </>
      :
      <>
      <h2>Tasks</h2>
      
      <button onClick={() => setDisplayForm(true)}>Add a Task</button>
      
      <div className="tasks-container">
        {
          tasks.filter(task => {
            return !task.completed
          }).map(task => {
            return <TaskItem key={task.id} task={task} />
          })
        }
      </div>
      </>
    )
}

/*
  Function to print a task in the list and mark tasks completed if checked. To change the appearance and function
  of the tasks edit the HTML here as needed. 
*/
const TaskItem = ({ task }) => {
  const {updateTask, getTasks} = useContext(TaskContext)
  
  const handleCheckBox = (idOfCurrentTask) => {
    console.log("Checked box")
    updateTask(idOfCurrentTask)
    .then(getTasks)
  }

  return(
  <section className="task">
    <p className="task__name">{task.task}</p>
    <p className="task__date">{task.date}</p>
    <div className = "checkbox">
      <p>Completed?<input type="checkbox" className="checkboxflag" id={task.id} onClick={()=>handleCheckBox(task.id)}></input></p>
    </div>
  </section>
  )
}

/*
  Function to add a task.
*/
const TaskForm = ({changeparentstate}) => {
  console.log("You clicked the button");
  const { addTask, getTasks } = useContext(TaskContext);
  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

  Define the initial state of the form inputs with useState()
*/
  const [task, setTask] = useState({
    task: "",
    date: "",
    completed: false,
    userId: localStorage.getItem("nutshell_user"),
  });

  const history = useHistory();

  /*
  When a field changes, update state. The return will re-render and display based on the values in state
*/
  const handleControlledInputChange = (event) => {
    const newTask = { ...task };
    newTask[event.target.id] = event.target.value;
    setTask(newTask);
  };

  const handleClickSaveTask = () => {
    console.log("You clickd save")
    const newTask = { ...task };

    addTask(newTask)
    .then(getTasks)
    .then(() => changeparentstate(false))
  };

  return (
    <fieldset>
    <input type="date" id = "date" onChange={handleControlledInputChange}/>
    <input type="text" placeholder="Enter task here" id="task" onChange={handleControlledInputChange}/>
    <button id="saveTask" onClick={() => handleClickSaveTask()}>Save Task</button>
    </fieldset>
  );
};

