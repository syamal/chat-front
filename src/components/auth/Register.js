import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {    
    width: '100%',
    height: '374px',
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
  
  iconButton: {
    padding: 10,
  }
}));

export default function Register(props) {
  const classes = useStyles();
  
  const [user, setUser] = React.useState({ username:'', password:'' })  
  const [rePass, setRePass] = React.useState('') ;

  const [registerDisabled, setRegisterDisabled] = React.useState(false) ;

  function setUsrname(usrname) {
    const newUserObj = { username: usrname, password:user.password };
    setUser(newUserObj);
  } 

  function setPwd(pwd) {
    const newUserObj = { username: user.username, password:pwd };
    setUser(newUserObj);
  } 

  function setRePasswd(rePass) {
    setRePass(rePass);
  } 

  function handleClick() {
    if(user.username!=='' && user.password!=='') {
        if (user.password !== rePass) {
            console.log("password is not same");
        } else {
          
          setRegisterDisabled(true);
          // Make login request
          axios.post('/user/register', {
              username: user.username,
              password: user.password
            })
            .then(function (response) {

              props.handleRegister(response.data);

              //props.history.push("/app");
            })
            .catch(function (error) {
              // handle error
              console.log(error);
              setRegisterDisabled(false);
            })            
        }       


    } else {
        console.log('type something');
    }
    
  } 

  function togglePage() {
    props.togglePage(1);
  } 


  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
        <Grid item xs={4}>
            <React.Fragment>        
                <Paper className={classes.root}>        
                    <div style={{ textAlign: 'center', padding: '30px 0px 0px 0px' }}> Register </div>       
                    <form
                        style={{ margin: '50px 61px' }}  
                    >                   
                        <TextField
                            id="outlined-with-username"
                            name="username"
                            label="Username"
                            placeholder="Username"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            style={{ width: '300px'}}
                            value={user.username}
                            onChange={event => setUsrname(event.target.value)}
                        />
                        <TextField
                            id="outlined-with-password"
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="Password"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            style={{ width: '300px'}}
                            value={user.password}
                            onChange={event => setPwd(event.target.value)}
                        />
                        <TextField
                            id="outlined-with-re-password"
                            name="rePass"
                            type="password"
                            label="Re-Password"
                            placeholder="Retype Password"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            style={{ width: '300px'}}
                            value={rePass}
                            onChange={event => setRePasswd(event.target.value)}
                        />
                    </form>
                </Paper>   
                
                <div style={{ margin: '0px 37px' }}>    
                    <Fab
                        variant="extended"
                        size="small"
                        color="primary"
                        aria-label="add"
                        style={{ width: '110px'}}
                        onClick={togglePage}
                    >
                        <KeyboardArrowLeftIcon />
                        Login
                    </Fab>

                    <Fab
                        variant="extended"
                        size="small"
                        color="primary"
                        aria-label="add"
                        className={classes.margin}
                        style={{ width: '158px'}}
                        onClick={handleClick}
                        disabled={registerDisabled}
                    >        
                        {registerDisabled ? "Please wait" : "Register" }
                    </Fab>
                </div>
                  
            </React.Fragment>
        </Grid>    
    </Grid>
  );
}