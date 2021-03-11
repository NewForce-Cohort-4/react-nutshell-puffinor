import React, { useContext, useEffect, useState, useRef } from "react"
import { MessageContext } from "./MessageProvider"
import { MessageCard } from "./MessageCard"
import "./Messages.css"
import { Container,Row, Col } from 'react-bootstrap'



//MessageList is exported and called at appviews when route is /Messages. 
export const MessageList = () => {
    //Bringing these in at MessageContext.Provider on the provider file
  const { messages, getMessages, addMessage } = useContext(MessageContext)
  const fieldRef = useRef(null);
  

  //this is independant (not afiliated with messages variable in provider)
  const [message, setMessage] = useState({})
    //isLoading is nothing but a boolean. setIsLoading is a fx or method that is assigned to adjust isLoading as needed
    //const [isLoading, setIsLoading] = useState(true)
  
    const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newMessage = { ...message }
    /* Animal is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newMessage[event.target.id] = event.target.value
    // update state
    setMessage(newMessage)
  }
  

  const handleClickSaveMessage = (event) => {
      console.log(localStorage.getItem('nutshell_user'));
      addMessage({
        message:message.message,
        userId:localStorage.getItem('nutshell_user'),
        time:new Date().toLocaleTimeString()
    }).then(() => {
        fieldRef.current.scrollIntoView();
        // expected output: "Success!"
      });
    }

  // Empty dependency array - useEffect only runs after first render, will not run the 2nd time because of the empty dependancy array
  useEffect(() => {
      getMessages()
      fieldRef.current.scrollIntoView()
  }, [])
  
  return (
      
    <>
        
        <div className='message-div'><h2>Messages</h2>
            <div className="messages-container">
        
                    {
                    messages.map(messageInLoop => {
                        return <MessageCard key={messageInLoop.id}
                            message={messageInLoop}
                            userName= {messageInLoop.user.name} />
                    })
                    }
                    <div className="dummy" ref={fieldRef}>
            </div>
            <Container fluid >
                <div className="input-group">
                <textarea type="text" id="message"  required autoFocus className="form-control" onChange={handleControlledInputChange}placeholder="message.." /> 
                <button 
                        onClick={event => {event.preventDefault()
                        handleClickSaveMessage()
                        }}>
                        Message
                    </button>
                </div>
            </Container> 
            
                
                </div>
        </div>
  </>
  )
}









