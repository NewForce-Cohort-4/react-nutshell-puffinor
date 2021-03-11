/*
  Component to list all tasks. TaskList finds the most up to date list of tasks
  and then prints them to the page using TaskItem, listed at the bottom of page. 
  Written by Vincent O
*/
import React, {useContext, useEffect } from "react"
import { TaskContext } from "./TaskDataProvider"

export const TaskList = () => {
  /*
    The useContext hook allows you to use data structures and 
    functions that a parent provider component exposes.

  */
  const { getTasks, tasks } = useContext(TaskContext)
  
  /*
    useEffect() allows for getting the data from somewhere else.
    The empty brackets [] are a dependency array and mean this 
    is only run at first load and never again because it's not given any trigger.
  */
  useEffect(() => {
    getTasks()
  }, [])
  
  return (
    <div className="tasks">
      {console.log("TaskList: Render", tasks)}
      {
        tasks.map(task => {
          return <TaskItem key={task.id} task={task} />
        })
      }
    </div>
  )
}

/*
  Function to print a task in the list. To change the appearance and function
  of the tasks edit the HTML here as needed. 
*/
const TaskItem = ({ task }) => (
  <section className="task">
    <h3 className="task__name">{task.task}</h3>
  </section>
)