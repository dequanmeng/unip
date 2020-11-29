// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { Login } from './components/login/Login';
import {
  BrowserRouter as Router,
    // , useLocation,
    Route,
    Switch,
    // Link,
    Redirect
    
} from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { useStateValue } from './context/StateProvider';
import { PublicRoute } from './util/PublicRoute';
import { ProtectedRoute } from './util/ProtectedRoute';
import { AppRouter } from './components/AppRouter/AppRouter';

function App() {
  const [{ auth, user }, dispatch] = useStateValue();

  useEffect(() => {
    const token =localStorage.getItem('token')
    if(token){
     const decodedToken = jwtDecode(token);
     console.log(decodedToken);
     
     if (decodedToken.exp *1000<Date.now()) {
       console.log(decodedToken+"fsfs");
       localStorage.removeItem('token')
       dispatch({type:'AUTH',auth:false})
       window.location.href = '/login';
       return
     } else {
       dispatch({type:'AUTH',auth:true})
      
             return
     }
    }
    // console.log('helloo effect');
    
    return
   }, [auth])


  return (
    <div className="App">
      <Router>

       <PublicRoute auth={auth}>
       <Switch>
            {/* <Route path="*">
                <Redirect to="/login" />
            </Route> */}

            <Route path="/login"> 
                  <Login/>
            </Route>
            </Switch>
      </PublicRoute> 
      
      <ProtectedRoute auth={auth}>
            <AppRouter/>
      </ProtectedRoute>
      </Router>
     </div>
  );
}

export default App;
