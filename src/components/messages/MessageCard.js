import React from "react"
import "./Messages.css"
import {Link} from "react-router-dom"

export const MessageCard = ({ message, userName }) => (
    
    <>
        <div className="container-card container card  rounded ">
            <div className='row '>
                <div className='name col-1  text-nowrap'><h6 className=' fw-bolder'>{userName}</h6></div>
                <div className='col-2 ><small class = text-muted'>{message.time}</div>
            </div>
            <div >
                <div >{message.message}</div>
            </div>
        </div>     
    </>       
)


 
    
        
    



