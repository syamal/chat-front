import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import axios from 'axios';

import socketIOClient from 'socket.io-client';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));


export default function Message(props) {
  const [message, setMessage] = useState('');

  const [clientId, setClientId] = useState();

  const [chatDisabled, toggleChatDisabled] = useState(true);
  
  const classes = useStyles();

  React.useEffect(() => {  
    
    if (props.clientId !== undefined) {
      toggleChatDisabled(false);
      setClientId(props.clientId)
    } 

  },[props.clientId]);

  function send() {
    if (message!== '' && clientId !== undefined) {
      
      let body = {
          user_id: props.userId, 
          to: clientId, 
          message: message
      }

      const socket = socketIOClient();
      socket.emit('status_added',  message);
      
      axios.post('/message/new', body)
        .then(function (response) {
          // handle success
          console.log(response.data);
          //props.history.push("/app");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })

      setMessage('');
    }
    
  }
  
  function setMsg(tmsg){
    setMessage(tmsg);
  }
  
  function handleKeyPress(event) {
    event.persist();
  
    if (event.keyCode === 13 || event.which === 13) {
      if(message!== '') { 
        send();
        //console.log(msg)
        setMessage('');
      }      
    }
  }

  return (
    <Paper className={classes.root} >
      
      <InputBase
        className={classes.input}
        name="msg"
        placeholder="Type Message"
        inputProps={{ 'aria-label': 'Type Message' }}
        value={message}
        onChange={event => setMsg(event.target.value)}
        onKeyPress={event => handleKeyPress(event)}
        disabled={ chatDisabled } 
      />
      
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton onClick={send} color="primary" className={classes.iconButton} aria-label="directions">
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
