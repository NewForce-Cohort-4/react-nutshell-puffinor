import React from "react"
import "./Messages.css"
import {Link} from "react-router-dom"

import { MessageList } from "./MessageList"

export const MessageCard = ({ message, userName, id, changeParentState }) => (
    
    <>
        <div className="container-card container card  rounded ">
            <div className='row '>
                <div className='name col-1  text-nowrap'><h6 className=' fw-bolder'>{userName}</h6></div>
                <div className='col-2 ><small class = text-muted'>{message.time}</div>
                <div className='col-2 ><small class = text-muted'>{id}</div>
                <button 
                        onClick={changeParentState}
                        >
                        Edit
                </button>
            </div>
            <div >
                <div >{message.message}</div>
            </div>
        </div>     
    </>       
)


 
    
        
    



