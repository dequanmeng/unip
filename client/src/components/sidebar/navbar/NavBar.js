import React, { useEffect, useState } from 'react'
import './NavBar.css'
import dashboardiconb from './dashboardb.svg'

import usericonb from './userb.svg'
import adminiconb from './managementb.svg'
import dashboardicon from './dashboard.svg'
import logouticon from './logout.svg'
import logouticonb from './logoutb.svg'
// import usericon from './user.svg'
import adminicon from './management.svg'
import { useLocation } from "react-router";
import {Link} from 'react-router-dom'
import AssessmentIcon from '@material-ui/icons/Assessment';
// import TimelineIcon from '@material-ui/icons/Timeline';
export const NavBar = () => {
     const location =useLocation()
     const [Active, setActive] = useState(null)
    useEffect(async() => {
       var temp;
       if(location.pathname=='/dashboard'){
           temp=1;
       }else if(location.pathname=='/insights'){
           temp=2;
       }else if(location.pathname=='/admin'){
           temp=3;
       }else if(location.pathname=='/logout'){
        temp=10;
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
            <Link to="/insights">
                {/* <img className="navitem-img" src={Active==2?usericonb:usericon}  /> */}
                <AssessmentIcon style={{color:Active==2?'var(--color-green)':'#666666'}} fontSize="large"/>
            </Link>  

            </div>
            <div className="navbaritem-container">
             <Link to="/admin">
                <img className="navitem-img" src={Active==3?adminiconb:adminicon}  />
             </Link> 

            </div>
            <div className="navbaritem-container">
             <Link to={{
                    pathname: '/logout',
           
                       state: { background: location }
                    }}>
                <img className="navitem-img" src={Active==10?logouticonb:logouticon}  />
             </Link> 

            </div>

        </div>
    )
}
