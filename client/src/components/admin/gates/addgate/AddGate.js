
import React, { useState } from 'react'
import './AddGate.css'

import { Button} from '@material-ui/core'
import config from './../../../../config/config';
import nIcon from './security-gate.svg'

export const AddGate= ({edata,handleClose,editmode}) => {
   const [name, setname] = useState(edata.name)
   const [cname, setcname] = useState(edata.name)
   const [id, setid] = useState(edata._id)
   const [errorMsg, seterrorMsg] = useState({name:"",apiKey:""})
   const [response, setresponse] = useState('')
   
   const handleSubmit=async (e)=>{
    e.preventDefault();
    if(cname==name){
        seterrorMsg({name:'Unchanged'}) 
        return 
    }

    try {
        const res = await fetch(
          config.baseUrl+'/gates',{
              method: editmode?'PATCH':'Post',

              body: JSON.stringify(

                {       id,
                        name
     
                        
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
     
        if (data.gate || data.cdata){
          setresponse(data)
          seterrorMsg({name:"",apiKey:""})
        }else{
            setresponse("")
            seterrorMsg(data.errors) 

        }


      } catch (err) {
        seterrorMsg(err) 
      }
  











}

    return (
        <div className="addgate-container">
        <form className="adduser-form" onSubmit={(e)=>{handleSubmit(e)}}>
       <p style={{fontSize:"20px"}}>{editmode?'Edit gate':'Add gate'}</p>
      <div className="id-container">
                <div className="input-container">
                                <div className="icon">
                                <img src={nIcon} />
                                </div>
                                
                                <input  className="input-field" type="text" minLength="2" placeholder="name" required 
                                    value={name}
                                    onChange={(e)=>{setname(e.target.value)}}
                                />
                            
                    </div>
                    
                     





      </div>
      
       
           { errorMsg.name &&<p className="adduser-error">{errorMsg.name}</p>}
           
             {(response && !editmode) ? <p style={{color:'green'}}>successful!</p>:''}
    {response?.cdata?.length?(<><span style={{color:'orange'}}>{ response.cdata}</span><p style={{color:'green',marginTop:'.5rem'}}> successfully changed !</p></>):''}
            <div className="addgate-button-container">
                    <Button style={{padding: '10px 40px'}} variant="contained" color="secondary" onClick={handleClose}>
                    Cansel
                    </Button>
                    <Button type="submit" variant="contained" style={{background:'var(--color-green)',color:'white',   marginLeft:'2rem'  , padding: '10px 50px',
                        fontSize: '0.875rem',
                        minWidth: '64px'}} >
                    Save
                    </Button>

            </div>
            </form>
      </div>
    )
}
