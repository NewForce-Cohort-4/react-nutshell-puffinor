import React from "react"
import "./Messages.css"
import {Link} from "react-router-dom"

import { MessageList } from "./MessageList"

export const MessageCard = ({ message, userName, id, changeParentState, userId, currentUser }) => {
    return (
    <>
        <div className="container-card container card  rounded ">
            <div className='row fluid'>
                
                <div className='col-lg fw-bolder'>{userName}</div>
                <div className='col-lg  text-nowrap><small class = text-muted'>{message.time}</div>
                <div className='col-lg  text-nowrap><small class = text-muted'>{id}</div>
                    {userId === currentUser ? (
                        <button onClick={changeParentState}>Edit</button> 
                        ) : (
                        ""
                        )}
                
            </div>
            <div >
                <div >{message.message}</div>
            </div>
        </div>     
    </>   
    )    
}


 
    
        
    



