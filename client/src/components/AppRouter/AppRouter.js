import React, { useEffect } from 'react'
import { Redirect, Route, Switch, useLocation } from "react-router";
import { Dashboard } from '../dashboard/Dashboard';
import { SideBar } from '../sidebar/SideBar';

// import { NoMatch } from '../NoMatch/NoMatch';



export const  AppRouter=() =>{
  const location = useLocation();
  // const location=useLocation()

    return (
        <>
        <SideBar />
    <Switch>
    <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
    <Route exact path="/">
      <Redirect to="dashboard"/>
    </Route>
    <Route path="/dashboard">
     <Dashboard/>
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



