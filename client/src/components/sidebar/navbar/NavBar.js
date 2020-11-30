import React, { useEffect, useState } from 'react'
import './NavBar.css'
import dashboardiconb from './dashboardb.svg'

import usericonb from './userb.svg'
import adminiconb from './managementb.svg'
import dashboardicon from './dashboard.svg'

import usericon from './user.svg'
import adminicon from './management.svg'
import { useLocation } from "react-router";
import {Link} from 'react-router-dom'
export const NavBar = () => {
     const location =useLocation()
     const [Active, setActive] = useState(null)
    useEffect(async() => {
       var temp;
       if(location.pathname=='/dashboard'){
           temp=1;
       }else if(location.pathname=='/profile'){
           temp=2;
       }else if(location.pathname=='/admin'){
           temp=3;
       }
       setActive(temp)

    }, [location])


    return (
        <div className="navbar">
            <div className="navbaritem-container">
              <Link to="/dashboard">
                 <img className="navitem-img" src={Active==1?dashboardiconb:dashboardicon}/>
              </Link>
            </div>
            <div className="navbaritem-container">
            <Link to="/profile">
                <img className="navitem-img" src={Active==2?usericonb:usericon}  />
            </Link>  

            </div>
            <div className="navbaritem-container">
             <Link to="/admin">
                <img className="navitem-img" src={Active==3?adminiconb:adminicon}  />
             </Link> 

            </div>

        </div>
    )
}
