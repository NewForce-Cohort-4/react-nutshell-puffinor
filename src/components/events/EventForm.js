import React, { useContext, useEffect, useState } from "react"
import { EventContext } from './EventProvider'
import { useParams, useHistory } from "react-router-dom"
import "./Events.css"

export const EventForm = ({setShowForm}) => {
    const { addEvent,getEvents } = useContext(EventContext)

    //Info for a new article
    const [eventState, setEvents] = useState({
        name: "",
        date: parseInt(Date.now()),
        location: "",
        userId: localStorage.getItem("nutshell_user")
    })
    // const [isLoading, setIsLoading] = useState(true)

    // const { eventId } = useParams()
    // const history = useHistory()

    // function for data is entered in text feilds 
    const handleControlledInputChange = (event) => {
        const newEvent = { ...eventState }

        newEvent[event.target.name] = event.target.value
        setEvents(newEvent)
    }
// fucntion when you hit save / update an article 
    const handleSaveEvent = () => {
        console.log(eventState.location);
        let currentUser = localStorage.getItem("nutshell_user")
        // setIsLoading(true);
        // if (eventId) {
        //     //update a current article 
        //     updateEvent({
        //         id: event.id,
        //         name: event.name,
        //         date: parseInt(Date.now()),
        //         location: event.location,
        //         userId: currentUser
        //     })
        //         .then(() => {
        //         getEvents()
        //         })
        // } else {
            // create a new article 
            addEvent(eventState)
                .then(() => {
                    setShowForm()
                    getEvents()
            })   
    }
    

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">New Article</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventName">Article title</label>
                    <input type="text" id="name" name="name" required autoFocus className="form-control"
                        placeholder="Event Title"
                        onChange={handleControlledInputChange}
                        defaultValue={eventState.name} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" name="location" required autoFocus className="form-control"
                        placeholder="Location"
                        onChange={handleControlledInputChange}
                        defaultValue={eventState.location} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Location</label>
                    <input type="date" id="date" name="date" required autoFocus className="form-control"
                         
                        onChange={handleControlledInputChange}
                        defaultValue={eventState.date} />
                </div>
            </fieldset>
            
            <button className="btn btn-primary"
                // disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    handleSaveEvent()
                }}>
                {/* {EventId ? <>Save Event</> :  */}
                <>Update Event</></button>
        </form >
    )

}
