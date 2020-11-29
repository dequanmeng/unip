import React, { useEffect } from 'react'
import { Redirect, Route, Switch, useLocation } from "react-router";

// import { NoMatch } from '../NoMatch/NoMatch';



export const  AppRouter=() =>{
  const location = useLocation();
  // const location=useLocation()

    return (
        <>
    <Switch>
    <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
    <Route exact path="/">
      <Redirect to="dashboard"/>
    </Route>
    <Route path="/dashboard">
     <p>welcome</p>
     </Route>
    <Route path="/admin">
   
    </Route>
    <Route path="/profile">
     
    </Route>

    <Route path="*">
                <Redirect to="/dashboard" />
    </Route>
  </Switch>
          
        </>
    )
}



