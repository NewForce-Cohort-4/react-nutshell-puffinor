import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "./EventProvider"
import { EventCard } from "./EventCard"
import { EventForm } from "./EventForm"
import "./Events.css"
import { useHistory } from "react-router-dom"



export const EventList = () => {
    
    const { events, getEvents } = useContext(EventContext)
    let [showForm, setShowForm] = useState(false)
    let currentUser = localStorage.getItem("nutshell_user")
    
    let UserSpecificEvents = events.filter((a) => {
        console.log(a.userId, currentUser);
        return (a.userId === currentUser)
    })
    let futureEvents = UserSpecificEvents.filter((a) => {
        return (new Date(a.date) >= parseInt(Date.now()))
    })
    let sortedEvents = futureEvents.sort((a, b) => {
        return new Date (a.date) - new Date (b.date) })

// listening function when New Article button is clicked to make it appear
    const handleClick = () => {
        const newEvent = showForm
        setShowForm(true)
    }
//makes the button hidden after you fill out the form 
     const changeState = () => {
        setShowForm(false)
    }

    const history = useHistory()

    useEffect(() => {
        getEvents()
        
    }, [])

    //function that handles the delete button
    // const handleDelete = (articleId) => {
    //     return () => deleteArticle(articleId).then(() => 
    //     history.push("/articles"))
    // }

    return (
        <>
        <h2>Event</h2>
        <button onClick={() => handleClick()}>
            New Event
        </button>
        {
            //making form appear then disapper after entering info 
            showForm ?
                <EventForm  setShowForm={changeState}/>
            : ""
        }
        
        <div className="events">
            
            {sortedEvents.map((event, i) => {
                console.log(i);
                return (
                    <EventCard
                    key={event.id}
                    event={event}
                    count = {i}
                    
                    // deleteArticle={handleDelete(article.id)}
                    
                    />);
                    
            })}
        </div>
        </>
    )
}

