import React, { useState } from 'react'

import deleteIcon from './../../users/deleteuser/delete.svg';
import config from './../../../../config/config'
import { Button } from '@material-ui/core';
export const DeleteGate = ({ddata,close}) => {
    const [msg, setmsg] = useState()
   const handleDelete=async()=>{
       
    try {
        const res = await fetch(
          config.baseUrl+'/gates',{
              method: 'delete',
            //   mode : 'cors',
              body: JSON.stringify(

                {      
                    id: ddata._id,
           
                        
                    }

              ),
                  headers:{
                    // 'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Origin': "*",
                    'Access-Control-Allow-Headers': "*",
                      'Content-Type': 'application/json',
                      'x-auth-token': localStorage.getItem('token')
                  }   
                 }
        )    
        const data=await res.json()  
        console.log('----Delete----')
        console.log(data)
        console.log('----------------')
     
        if (data.msg ){
            setmsg(data.msg) 
          
        }else{
            
            setmsg(data.msg) 

        }


      } catch (err) {
        setmsg(err) 
      }
  
   }
    return (
        <div className="deleteuser-container">
            <div className="deleteIcon-container">
               <img src={deleteIcon} className="deleteIcon" />
            </div>
            <p >Delete User</p>
    <p>Are you sure to delete <span style={{color:'red'}}>{ddata.name}</span>?</p>
    <p style={{color:'green'}}>{msg}</p>
    <div className="deleteuser-button-container">
                    <Button style={{padding: '10px 30px'}}variant="contained" color="secondary" onClick={close}>
                    Cansel
                    </Button>
                    <Button  variant="contained" style={{background:'var(--color-green)',color:'white', marginLeft:'2rem'  , padding: '10px 30px',
                        fontSize: '0.875rem',
                        minWidth: '64px'}} 
                        onClick={handleDelete}
                        >
                      Delete
                    </Button>
            </div>
    
        </div>
    )
}
