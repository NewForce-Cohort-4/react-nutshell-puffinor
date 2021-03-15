import React, { useState, createContext } from "react"

export const EventContext = createContext()

export const EventProvider = (props) => {
    const [events, setEvents] = useState([])

// list of articles 
    const getEvents = () => {
        return fetch("http://localhost:8088/events")
        .then(res => res.json())
        .then(setEvents)
    }

    // adding an article
    const addEvent = (eventState) => {
        return fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventState)
        })
        .then(getEvents)
    }

    // // delete an article
    // const deleteArticle = articleId => {
    //     return fetch(`http://localhost:8088/articles/${articleId}`, {
    //         method: "DELETE"
    //     })
    //     .then(getArticles)
    // }

    // //grouping articles by Ids
    // const getArticleById = (id) => {
    //     return fetch(`http://localhost:8088/articles/${id}?_expand=user`)
    //     .then(res => res.json())
    // }
    
    // //updating an article 
    // const updateArticle = (article) => {
    //     return fetch(`http://localhost:8088/articles/${article.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(article)
    //     })
    //     .then(getArticles)
    // }

    //exporting all functions for article context 
    return (
        <EventContext.Provider value={{
            events, getEvents, addEvent
                    }}>
            {props.children}
        </EventContext.Provider>
    )
}