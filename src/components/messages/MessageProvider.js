import React, { useState, createContext } from "react"
//setAnimal

// The context is imported and used by individual components that need data
export const MessageContext = createContext()

// This component establishes what data can be used.This function is called on the appviews file whenver the route is /animals
export const MessageProvider = (props) => {
    //statefunction
    const [messages, setMessages] = useState([])
    //new magic state. tracking searchTerms, set to empty string right now. We need to export setSearchTerms below. We generally have not exported setters, setAnimals for instance, becuase it is called everytime we use getAnimals
    


    const getMessages = () => {
        return fetch("http://localhost:8088/messages?_expand=user")
        .then(res => res.json())
        .then(setMessages)
    }

    const addMessage = messageObj => {
        return fetch("http://localhost:8088/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageObj)
        })
        .then(getMessages)
    }

    // const getAnimalById = (id) => {
    //     return fetch(`http://localhost:8088/animals/${id}?_expand=location&_expand=customer&_expand=customer`)
    //         .then(res => res.json())
            
    // }

    // const releaseAnimal = animalId => {
    //     return fetch(`http://localhost:8088/animals/${animalId}`, {
    //         method: "DELETE"
    //     })
    //         .then(getAnimals)
    // }

    const updateMessage = messageObject => {
        return fetch(`http://localhost:8088/messages/${messages.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(messageObject)
        })
          .then(getMessages)
      }

    /*
        You return a context provider which has the
        `animals` state, `getAnimals` function,
        and the `addAnimal` function as keys. This
        allows any child elements to access them.
    */
    return (
        <MessageContext.Provider value={{
            messages, getMessages, addMessage, updateMessage, 
        }}>
            {props.children}
        </MessageContext.Provider>
    )
}

