import React, { useState} from 'react';
import axios from 'axios';

import Message from './Message';
import MessageL from './MessageL';

export default function MessageList(props) {
  const [chat, setChat]   = useState();

  React.useEffect(() => {  
  	

  	if (props.clientId !== undefined) {
  		
      axios.post('/message/all', {
        user_id: props.userAuthDetails.user.id,
        to: props.clientId
      }).then(function (response) {
        setChat(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  	} 

  },[props.clientId, props.userAuthDetails.user.id]);

  return (
    <React.Fragment>
      <div style={{ paddingRight: '50px'}} >
        <MessageL userId={props.userAuthDetails.user.id} chat={chat} />    
        <Message userId={props.userAuthDetails.user.id} clientId={props.clientId} />    
      </div> 
    </React.Fragment>
  );
}