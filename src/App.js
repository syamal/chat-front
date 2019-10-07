import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
//import history from 'history';


import { makeStyles } from '@material-ui/core/styles';

//import Header from './components/layout/Header';
//import Login from './components/auth/Login';
import Auth from './components/auth/Auth';
//import Register from './components/auth/Register';
//import MessageList from './components/MessageList';
import Chat from './components/Chat';

import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 50,
  },
}));

function App() {
  //const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const [userAuthenticated, setUserAuthenticated] = React.useState(false);

  const [userAuthDetails, setUserAuthDetails] = React.useState(Object);

  function handleAuth(userAuthData) {
    setUserAuthDetails(userAuthData);
    setUserAuthenticated(true);
  }

  function handleLogout() {
    setUserAuthDetails(null);
    setUserAuthenticated(false);
    console.log(userAuthenticated);
  }

  return (
    <Router>
      <div className={classes.root}>
        {/* <Header />  */}
        { userAuthenticated ? <Chat userAuthDetails = {userAuthDetails} handleLogout={handleLogout} /> :
            <Auth handleAuth = {handleAuth} />
        }
      </div>
    </Router>    
  );
}

export default App;
