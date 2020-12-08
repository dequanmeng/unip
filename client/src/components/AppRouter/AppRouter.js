import React from 'react';
import { Redirect, Route, Switch, useLocation } from "react-router";
import { AdminPanel } from '../admin/AdminPanel';
import { UsersPanel } from '../admin/users/UsersPanel';
import { Dashboard } from '../dashboard/Dashboard';
import Logout from '../logout/Logout';
import { SideBar } from '../sidebar/SideBar';

// import { NoMatch } from '../NoMatch/NoMatch';



export const  AppRouter=() =>{
  const location = useLocation();
 
  let background = location.state && location.state.background;
    return (
        <>
        <SideBar />
    <Switch location={background || location}>
    <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
    <Route exact path="/">
      <Redirect to="dashboard"/>
    </Route>
    <Route path="/dashboard">
     <Dashboard/>
     </Route>
    <Route path="/admin" exact={true}>
        <AdminPanel/>

  

    </Route>
    <Route path="/admin/users" >
            <UsersPanel/>
    </Route>

    <Route path="/admin/gates">
        
    </Route>
    <Route path="/profile">
     
    </Route>
    {/* <Route path="/users/edit">
    <div>{location?.state?.data?.firstName||'ops no data'}</div>
     </Route> */}
 

    <Route path="*">
                <Redirect to="/dashboard" />
    </Route>
  </Switch>
  {background && <Route path="/logout" children={<Logout/>} />} 
        </>
    )
}



