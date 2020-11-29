
import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import config from './../../config/config.js'
import './Login.css';
import Email from './email.png'
import invisible from './invisible.svg'
import view from './view.svg'

// import user from './user.png'
// import call from './call.png'
export const Login = () => {
  const [active, setactive] = useState(true)
  const [ErrorMsg, setErrorMsg] = useState(null)
  const history = useHistory();
  const [{}, dispatch] = useStateValue();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")
    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        // console.log(email,password);
        setemail("");
        setpassword("");
        try {
            const res = await fetch(config.baseUrl+'/login', { 
              method: 'POST', 
             
              body: JSON.stringify({ email, password }),
              headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
   
            if(data.token){
              localStorage.setItem('token',data.token)
              dispatch({
                type: "SET_USER",
                user: data.user,
              });
              dispatch({
                type: "AUTH",
                auth: true,
              });
              history.push('/dashboard')
            }else{
               setErrorMsg(data.msg)
              console.log("[error]:",data);
            }
          }
          catch (err) {
            setErrorMsg(err)
            console.log(err);
          }
    
    }
    return (
        <div className="Login">
            <form action="/action_page.php" className="Login-form" onSubmit={(e)=>{handleSubmit(e)}}>
                <p style={{fontSize:"23px"}}>Welcome back!</p>
             

                <div className="input-container">
                <div className="icon">
                  <img src={Email} />
                  </div>
                
                  <input  className="input-field" type="email" placeholder="email" required 
                    value={email}
                    onChange={(e)=>{setemail(e.target.value)}}
                  />
               
                </div>

                <div className="input-container" >
                <div className="icon" onClick={()=>{setactive(pre=>!pre)}} style={{cursor:"pointer"}}>
                  <img src={active ? invisible:view} />
                  </div>
                  <input className="input-field" type={active?"password":"text"} 
                  placeholder="password" name="usrnm" required minLength="8"
                  value={password}
                  onChange={(e)=>{setpassword(e.target.value)}}
                  />
                
                </div>
                <p className="login-error">{ErrorMsg}</p>

                <button type="submit" className="btn" col="80">Login</button>
          </form>
        </div>
    )
}
