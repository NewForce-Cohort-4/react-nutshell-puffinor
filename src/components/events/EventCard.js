import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import "./Events.css"


// How article is being printed to the DOM 
export function EventCard({ event , count}) {
    {console.log(count)}
    {count++}
    return(

        
           (count===1)?
                <section className="event bg-light">
                    
                    <div className="event__name font-weight-bold">Event: {event.name}</div>
                    <div className='event__location font-weight-bold'>Location: {event.location}</div>
                    <div className="event__date font-weight-bold">Date: {event.date}
                    </div>
                    <br/>
                    
                </section>
                    
                :
                <section className="event">
                    <div className="event__name">Event: {event.name}</div>
                    <div className='event__location'>Location: {event.location}</div>
                    <div className="event__date">Date: {event.date}
                    </div>
                    <br/>
                    
                </section>
                
                
    )    
        
}

