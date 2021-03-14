import React, { useContext, useEffect, useState, useRef } from "react"
import { MessageContext } from "./MessageProvider"
import { MessageCard } from "./MessageCard"
import "./Messages.css"
import { Container,Row, Col } from 'react-bootstrap'



//MessageList is exported and called at appviews when route is /Messages. 
//component, not functions, consists of user interface includes jsx
export const MessageList = () => {
    //Bringing these in at MessageContext.Provider on the provider file
  const { messagesFromProvider, getMessages, addMessage, updateMessage } = useContext(MessageContext)
  const fieldRef = useRef(null);
  

  //this is independant (not afiliated with messages variable in provider)
  //here is where you add things to state, which means you can track its changes in the reactdev.Upon creation its set to empty object
  const [message, setMessage] = useState({message:''})
  //set editId to state. 
  const [editId, setEditId] = useState(0)
  const [editedMessage, setEditedMessage] = useState({message:''})
  
  
    //isLoading is nothing but a boolean. setIsLoading is a fx or method that is assigned to adjust isLoading as needed
    //const [isLoading, setIsLoading] = useState(true)
    const handleEdits=(event)=>{
      const edit = {...editedMessage}
      edit[event.target.id]= event.target.value
      setEditedMessage(edit)
      console.log(editedMessage.message)
    }
  
    const handleMessageInputControlledChanges = (event) => {
    //create a copy of the object that was created when state was initialized. Name it whatever, its a copy now
    const newMessage = { ...message }
    newMessage[event.target.id] = event.target.value
    setMessage(newMessage)
    ;
    // update state
    
  }
  
  

  const handleClickSaveMessage = (event) => {
    
      addMessage({
        message:message.message,
        userId:localStorage.getItem('nutshell_user'),
        time:new Date().toLocaleTimeString()
    }).then(() => {
        fieldRef.current.scrollIntoView();
        setMessage({message:" "})
        
        
        // expected output: "Success!"
      });
    }

    //a messaages edit button is clicked 
    const handleClickEditMessage = (id) =>{
      setEditId(id)
      editedMessage.value = 'plwAS';
      
    }
    const handleClickCancelEdit = () =>{
      setEditId(0)
    }
    const handleClickSaveChanges = ()=>{
      
      updateMessage({
        id:editId,
        message:editedMessage.message,
        userId:localStorage.getItem('nutshell_user'),
        time:new Date().toLocaleTimeString()
      }).then(() => {
        setEditId(0)
        
      })
    }


  // Empty dependency array - useEffect only runs after first render, will not run the 2nd time because of the empty dependancy array
  useEffect(() => {
      getMessages()
      fieldRef.current.scrollIntoView()
  },[])
  
  return (
      
    <>
        
        <div className='message-div'><h2>Messages</h2>
            <div className="messages-container">
        
                    {
                      //getMessages has been called from useEffect we now itereate through messages from the fetch call
                      //if editId, which is in state and set originally to 0, now matches that of a fetch calls message.id
                      //bring up the text edit form referenced by editTextAreaId.
                    messagesFromProvider.map(messageInLoop => {
                      console.log(messageInLoop.userId, localStorage.getItem('nutshell_user'));
                      return  (editId===messageInLoop.id)
                      //if 
                      ?   <Container fluid >
                        <div className="edit-group ">
                      <textarea type="text" id="message"  required autoFocus className="edit-form-control" onChange={handleEdits} defaultValue = {messageInLoop.message} /> 
                          <button 
                              onClick={event => {event.preventDefault()
                                handleClickSaveChanges(messageInLoop.id)
                              }}>
                              Save Changes
                          </button>
                          <button 
                              onClick={event => {event.preventDefault()
                                handleClickCancelEdit()
                              }}>
                              Cancel
                          </button>
                      </div>
                  </Container> 


                          // if the editId, which is in State which we originally set equal to 0, is still 0 (doesnt match any messages'id), then send these to the messageCard component. message is the message, user name, changeParentState is an anonymous function. Send it to componenet card because that is where its childEvent (button is). Send the function there, to be available if clicked. Carefull not to create infinite loop, mnust be anon fx
                      :  <MessageCard key={messageInLoop.id}
                            message= {messageInLoop}
                            userName= {messageInLoop.user.name}
                            userId={messageInLoop.userId}
                            currentUser={localStorage.getItem('nutshell_user')}
                            changeParentState= {()=>handleClickEditMessage(messageInLoop.id)} />
                  })
                    }
                    {/* //fake div created to use auto scroll effect */}
                    <div className="dummy" ref={fieldRef}>
            </div>
            <Container fluid >
                <div className="input-group">
                <textarea type="text" id="message"  required autoFocus className="form-control" onChange={handleMessageInputControlledChanges} value={message.message} placeholder="message.." /> 
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









