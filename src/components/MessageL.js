
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import socketIOClient from 'socket.io-client';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  card: {
    maxWidth: '80%',
    padding: '7px',
  },
  title: {
    fontSize: 14,
  },
  msgWarning: {
    height: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  msg: {
    fontSize: '0.7em',
    textAlign: 'left',
    border: '1px solid #f9f9f9',
    borderRadius: '5px',
    padding: '1.5em',
    margin: '0.3em',

    position: 'relative',
    wordWrap: 'break-word',
    maxHeight: '100px',
    whiteSpace: 'pre-wrap',
  },
  roomMsg: {
    backgroundColor: '#fff',    
  },
  myMsg: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',    
  },
}));

export default function MessageL(props) {
  const [messages, setMessages] = useState([]);
  const classes = useStyles();

  const [chatDisabled, toggleChatDisabled] = useState(true);

  const [channelId, setChannelId] = useState('');

  const chatRef = React.useRef(null);
    
  useEffect(() => {       
    if (channelId !== '') {
      
      const socket = socketIOClient('https://boiling-everglades-56328.herokuapp.com/');

      socket.on(channelId, data => setMessages(messages => [...messages, data])); 
      //console.log(messages)   
    }      
     
  },[channelId]);

  useEffect(() => {       
    if (props.chat!== undefined) {
      toggleChatDisabled(false);
      setMessages(props.chat.messages);
      if(props.chat.count !== 0 ) {
        setChannelId(props.chat.messages[0].channel_id)
      }      
    }  
  },[props.chat]);

  useEffect(() => {       
    scrollToBottom();       
  },[messages]);

  function scrollToBottom() {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }

  return (
    <React.Fragment>
      <div ref={chatRef} style={{ backgroundColor: '#cfe8fc', height: '80vh', maxHeight: '80vh', overflow: 'auto' }}  >
        { chatDisabled ? <p className={classes.msgWarning}> Select one user </p> :
        <React.Fragment>
          { props.chat.count === 0 ? <p className={classes.msgWarning}> No messages yet. </p> : 
          <React.Fragment>
            {messages.map((message,i) => {           
              return (              
                <React.Fragment key={i}>
                  { (message.from !== props.userId ) ?
                    <div className={`${classes.msg} ${classes.roomMsg}`} style={{width: '80%', float: 'left'}}>             
                      {message.message}
                    </div> :
                    <div className={`${classes.msg} ${classes.myMsg}`} style={{width: '80%', float: 'right'}}>             
                      {message.message}
                    </div>
                  }                               
                </React.Fragment>
              );
            })}   
          </React.Fragment>
          }
                
        </React.Fragment>
        } 
      </div>    
    </React.Fragment>   
  ); 

}
