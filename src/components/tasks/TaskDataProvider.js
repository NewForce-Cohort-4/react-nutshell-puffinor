/* 
Data provider component to get and modify tasks in a local database.
Written by Vincent O
*/
import React, { useState, createContext } from "react"

/*
  Define a data CONTEXT to store the data we want to use in React.
  This context is what will be imported and stored by other componets using the data.
  Defining our data was previously done in JS with:
    const tasks = []
*/ 
// used when we need the data
export const TaskContext = createContext()

/*
  Define a data provider COMPONENT that other components use to get the data in the context.
  You define a single property for each provider defined in your system. This is because 
  the components that uses the data must be defined as children components, and React will 
  send an object to each component.
  Defining a data provider was previously done with a separate function for each API call,
  then copying the true data to a local version a specific component could alter and use.
*/
// used to get the data
export const TaskProvider = (props) => {
  // Defines a variable that holds the state of the component, and a function that updates it.
  const [tasks, setTasks] = useState([])
  
  // Create functions to perform state transitions on the database and maintain up to date syncing.
  const getTasks = () => {
    return fetch("http://localhost:8088/tasks")
    .then(urlresponse => urlresponse.json())
    .then(setTasks)
  }
  
  const addTask = newTaskObj => {
    return fetch("http://localhost:8088/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(newTaskObj)
    })
    .then(getTasks)
  }

  const updateTask = (id) => {
    return fetch(`http://localhost:8088/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({completed: true})
    })
    .then(res=>res.json())
  }
  
  /*
    React components return something, here we return context provider containing the 
    'task' state, a 'getTasks' function, and a 'addTask' function. This is what this 
    component will expose to other components.
  */
  return (
    <TaskContext.Provider value={{ tasks, getTasks, addTask, updateTask }}>
      {props.children}
    </TaskContext.Provider>
  )
}