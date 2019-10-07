import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {    
    width: '98%',
  },
  list:{    
    backgroundColor: theme.palette.background.paper,
    paddingLeft:20,
  },
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '94%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  }
}));

export default function UsersList(props) {
  const classes = useStyles();

  const [clients, setClients] = React.useState([]);

  const [selectedIndex, setSelectedIndex] = React.useState();

  React.useEffect(() => {   
    // Make a request for userlist
    //console.log(props.userAuthDetails);
    
    axios.post('/user/all', {
        user_id: props.userAuthDetails.user.id
      })
      .then(function (response) {
        // handle success
        //console.log(response.data);
        setClients(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  
  },[props.userAuthDetails]);

  const handleListItemClick = (event, index, client_id) => {
    setSelectedIndex(index);
    props.changeClient(client_id);
  };

  function handleLogout() {
    props.handleLogout();
  }
  
  return (
    <React.Fragment>
      <Paper className={classes.root}>
        
        <div className={classes.search}>      
          <InputBase
            className={classes.input}
            placeholder="Search Members"
            inputProps={{ 'aria-label': 'search people' }}
          />
          <IconButton className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>
        
        <List dense className={classes.list} style={{ height: '70vh', maxHeight: '70vh', overflow: 'auto' }} >
          {clients.map((client,i) => {           
            return (              
              <React.Fragment key={i}>
                <ListItem  
                  button
                  selected={selectedIndex === i}
                  onClick={event => handleListItemClick(event, i, client._id)}
                >
                  <ListItemAvatar>
                    <AccountCircleIcon />
                  </ListItemAvatar>
                  <ListItemText primary={client.username} />            
                </ListItem>              
                <Divider />  
              </React.Fragment> 
            );
          })}
        </List>
      </Paper>   
    
      <Fab
        variant="extended"
        size="small"
        color="primary"
        aria-label="add"
        className={classes.margin}
        style={{ width: '300px'}}
        onClick = {handleLogout}
      >
        <ExitToAppIcon className={classes.extendedIcon} />
        Log out
      </Fab>
    </React.Fragment>
  );
}