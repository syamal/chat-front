import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UsersList from './UsersList';
import MessageList from './MessageList';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft:110,
    paddingRight:110,
  }
}));

function Chat(props) {
  const [clientId, setClientId]   = React.useState();
  const classes = useStyles();

  function changeClient(id) {
    setClientId(id);
  }

  function handleLogout() {
    props.handleLogout();
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <UsersList userAuthDetails ={props.userAuthDetails} changeClient={changeClient} handleLogout={handleLogout}/>
        </Grid>
        <Grid item xs={8}>
          <MessageList userAuthDetails ={props.userAuthDetails} clientId={clientId} />
        </Grid>      
      </Grid>
    </div>
  );
}

export default Chat;