import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import config from './../../../../config/config'
import view from './../../../login/view.svg'
import invisible from './../../../login/invisible.svg'
import './ResetPassword.css'
export const ResetPassword = ({rdata,close}) => {
    const [active, setactive] = useState(false)
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')
    const [msg, setmsg] = useState(['',true])
    const handleReset=async(e)=>{

        e.preventDefault();

if(cpassword==password){
        try {
            const res = await fetch(
              config.baseUrl+'/users/resetpassword',{
                  method: 'PATCH',
                //   mode : 'cors',
                  body: JSON.stringify(
    
                    {       id:rdata._id,
                             password
                            
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
            console.log('----Reset----')
            console.log(data)
            console.log('----------------')
         
            if (data.msg){
                setmsg([data.msg,true]) 
            }else{
                
                setmsg([data.errors,false]) 
    
            }
    
    
          } catch (err) {
            setmsg([err.errors,false]) 
          }
      

       }else{

        setmsg(['password not match',false]) 

       }
    }
    return (
        <div className="resetpassword-container">
             <form className="adduser-form" onSubmit={(e)=>{handleReset(e)}}>
             <div className="input-container" >
                        <div className="icon" onClick={()=>{setactive(pre=>!pre)}} style={{cursor:"pointer"}}>
                            <img src={active ? invisible:view} />
                            </div>
                            <input className="input-field" type={active?"password":"text"} 
                            placeholder="new password" name="usrnm" required minLength="8"
                            value={password}
                            onChange={(e)=>{setpassword(e.target.value)}}
                            />
                </div> 
                <div className="input-container" >
                        <div className="icon" onClick={()=>{setactive(pre=>!pre)}} style={{cursor:"pointer"}}>
                            <img src={active ? invisible:view} />
                            </div>
                            <input className="input-field" type={active?"password":"text"} 
                            placeholder="confirm password" name="usrnm" required minLength="8"
                            value={cpassword}
                            onChange={(e)=>{setcpassword(e.target.value)}}
                            />
                </div>  
                <p style={{color:(msg[1])?'green':'red'}}>{msg[0]}</p>
                <div className="resetpassword-button-container">
                    <Button style={{padding: '10px 30px'}} variant="contained" color="secondary" onClick={close}>
                    Cansel
                    </Button>
                    <Button variant="contained" style={{background:'var(--color-green)',color:'white', marginLeft:'2rem'  , padding: '10px 30px',
                        fontSize: '0.875rem',
                        minWidth: '64px'}} 
                     type="submit"
                        >
                      Reset
                    </Button>
                 </div>
                 </form>
    
        </div>


        
    )
}
