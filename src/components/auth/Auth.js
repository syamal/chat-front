import React from 'react';

import Login from './Login';
import Register from './Register';



function Auth(props) {
  
  const [page, setPage] = React.useState(1)  


  function handleAuth(userAuthData) {
    props.handleAuth(userAuthData);
  }

  function togglePage(num) {
    setPage(num);
  }

    
  return (
    <React.Fragment>
    { (page === 2) ? <Register handleRegister = {handleAuth} togglePage={togglePage} /> :
            <Login handleLogin = {handleAuth} togglePage={togglePage} />
        }
    </React.Fragment>
  );
}

export default Auth;