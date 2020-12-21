import React, { useState } from 'react'
import './AddUser.css'
import Email from './../../../login/email.png'
import invisible from './../../../login/invisible.svg'
import view from './../../../login/view.svg'
import AdminIcon from './management.svg'
import callIcon from './call.svg'
import fnIcon from './user.svg'
import lnIcon from './name.svg'
import { Button, Checkbox } from '@material-ui/core'
import config from './../../../../config/config';
// import { usePost } from '../../../../hooks/usePost'
// import {Post} from './../../../../util/Post.js'

export const AddUser = ({edata,handleClose,editmode}) => {
   const [firstName, setfirstName] = useState(edata.firstName)
   const [lastName, setlastName] = useState(edata.lastName)
   const [password, setpassword] = useState('')
   const [phoneNumber, setphoneNumber] = useState(edata.phoneNumber)
   const [email, setemail] = useState(edata.email);
   const [id, setid] = useState(edata._id)
   const [isAdmin, setisadmin] = useState(edata.isAdmin)
   const [active, setactive] = useState(false)
   const [errorMsg, seterrorMsg] = useState({email:"",password:"",firstName:"",lastName:"",phoneNumber:""})
   const [response, setresponse] = useState('')
   console.log(edata);
   const handleSubmit=async (e)=>{
    e.preventDefault();


    try {
        const res = await fetch(
          config.baseUrl+'/users',{
              method: editmode?'PATCH':'Post',
            //   mode : 'cors',
              body: JSON.stringify(

                {       id,
                        firstName,
                        lastName,
                        password,
                        phoneNumber,
                        email,
                        isAdmin
                        
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
        console.log('----Post----')
        console.log(data)
        console.log('----------------')
     
        if (data.user || data.cdata){
          setresponse(data)
          seterrorMsg({email:"",password:"",firstName:"",lastName:"",phoneNumber:""})
        }else{
            setresponse("")
            seterrorMsg(data.errors) 

        }


      } catch (err) {
        seterrorMsg(err) 
      }
  











}

    return (
        <div className="adduser-container">
        <form className="adduser-form" onSubmit={(e)=>{handleSubmit(e)}}>
       <p style={{fontSize:"20px"}}>{editmode?'Edit user':'Define user'}</p>
      <div className="id-container">
                <div className="input-container">
                                <div className="icon">
                                <img src={fnIcon} />
                                </div>
                                
                                <input  className="input-field" type="text" minLength="2" placeholder="first name" required 
                                    value={firstName}
                                    onChange={(e)=>{setfirstName(e.target.value)}}
                                />
                            
                  </div>
                    <div className="input-container ml">
                                <div className="icon">
                                <img src={lnIcon} />
                                </div>
                                
                                <input  className="input-field" type="text" minLength="2" placeholder="last name" required 
                                    value={lastName}
                                    onChange={(e)=>{setlastName(e.target.value)}}
                                />
                            
                    </div>

                     





      </div>
      <div className="contact-container">
          
          <div className="input-container">
                    <div className="icon">
                      <img src={Email} />
                      </div>
                    
                      <input  className="input-field" type="email" placeholder="email" required 
                        value={email}
                        onChange={(e)=>{setemail(e.target.value)}}
                      />
                  
          </div>
          <div className="input-container ml">
                    <div className="icon">
                      <img src={callIcon} />
                      </div>
                    
                      <input 
                       className="input-field"
                        type="tel"
                         placeholder="0917-000-00-00"
                         pattern="[0-9]{4}[0-9]{3}[0-9]{2}[0-9]{2}"
                         required 
                        value={phoneNumber}
                        onChange={(e)=>{setphoneNumber(e.target.value)}}
                      />
                  
          </div>



      </div>
      <div className="security-container">
{ !editmode&&           <div className="input-container" >
                        <div className="icon" onClick={()=>{setactive(pre=>!pre)}} style={{cursor:"pointer"}}>
                            <img src={active ? invisible:view} />
                            </div>
                            <input className="input-field" type={active?"password":"text"} 
                            placeholder="password" name="usrnm" required minLength="8"
                            value={password}
                            onChange={(e)=>{setpassword(e.target.value)}}
                            />
                        
            </div>}
            <div className={`input-container ${!editmode &&'ml'}`} >
                      <div className="icon" >
                          <img src={AdminIcon} />
                      </div>
                      <div className="input-field input-field-checkbox">
                          <div className="checkbox-container" >
                            <p>set as Admin</p>
                            <Checkbox style={{color:'var(--color-green)'}} checked={isAdmin} onChange={(e)=>{setisadmin(e.target.checked)}}  />
                          </div>
                      </div>
                        

                      
            </div>
        </div>
           { errorMsg.email &&<p className="adduser-error">{errorMsg.email}</p>}
           { errorMsg.password && <p className="adduser-error">{errorMsg.password}</p>}
            { errorMsg.firstName && <p className="adduser-error">{errorMsg.firstName}</p>}
            { errorMsg.lastName && <p className="adduser-error">{errorMsg.lastName}</p>}
            { errorMsg.phoneNumber &&<p className="adduser-error">{errorMsg.phoneNumber}</p>}
             {(response && !editmode) ? <p style={{color:'green'}}>successful!</p>:''}
    {response?.cdata?.length?(<><span style={{color:'orange'}}>{ response.cdata.join(' , ')}</span><p style={{color:'green',marginTop:'.5rem'}}> successfully changed !</p></>):''}
            <div className="adduser-button-container">
                    <Button variant="contained" color="secondary" onClick={handleClose}>
                    Cansel
                    </Button>
                    <Button type="submit" variant="contained" style={{background:'var(--color-green)',color:'white',    padding: '6px 30px',
                        fontSize: '0.875rem',
                        minWidth: '64px'}} >
                    Save
                    </Button>
            </div>
            </form>
      </div>
    )
}
