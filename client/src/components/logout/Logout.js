import React, { useState } from 'react'

import "./Logout.css"
import {   Redirect, useHistory,useLocation,withRouter } from 'react-router-dom';
import { useStateValue } from '../../context/StateProvider';
import logouticon from './logout.svg'
const Logout = (props) => {
  let history = useHistory();
  const location=useLocation()
  const [{ }, dispatch] = useStateValue();
   

  let back = e => {
    e.stopPropagation();
    history.goBack();
  };

    const handleLogout = () => {
        console.log('Logout');
        localStorage.removeItem('token');
       
        dispatch({type:'AUTH',auth:false});
        dispatch({type:'SET_USER',user:null});
        history.push()
        // window.location.href = '/login';
       
       
    };
  
    return (
      <div
      onClick={back}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex:99999999,
        background: "rgba(0, 0, 0, 0.7)",
        display:'flex'
        
      }}
    >
                <div
                className='logout'
                  style={{
                   position:'absolute',
                    width:'30%',
                    height:'34%',
                    background: "#16191d",
                    left:'35%',
                    top:'33%',
                    padding: 15,
                     
                    border: "3px solid #666666"
                  }}
                >
                  <div>
                  <img src={logouticon} className="logout-icon"/>
                  </div>
                  <h4>LogOut</h4>
                  <p >Are you sure to exit?</p>
                <div className='logout-btn-container'>
                <button className="logout-btn logout-btn-red" type="button" onClick={back}>
                    Close
                  </button>
                  <button className="logout-btn logout-btn-green" type="button" onClick={handleLogout}>
                    Yes
                  </button>
                
                  </div>
                </div>
    </div>
    )
}

export default withRouter(Logout) 
