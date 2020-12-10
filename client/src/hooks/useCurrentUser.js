import React from 'react'


// import axios from 'axios';
import config from '../config/config';

export const useCurrentUser = () => {
    // url, options
  

        const [user, setResponse] = React.useState([]);
      
    
 
        React.useEffect(() => {
          const fetchData = async () => {
            
            try {
              const res = await fetch(
                config.baseUrl+'/users/currentuser',{
                    method:'GET',
                        headers:{
                            'Content-Type': 'application/json',
                            'x-auth-token': localStorage.getItem('token')
                        }   
                       }
              )    
              const data=await res.json()  
              console.log('----useCurrentUser----')
              console.log(data)
              console.log('----------------')
           
              if (data.user){
                setResponse(data.user);
               
               
            
              }else{
                
                console.log(data);
              }
      

            } catch (err) {
              console.log(err);
            }
          };
          fetchData();
        }, []);
        return user;
         
 
}
      // await axios.get(config.baseUrl+url,{
            //     headers:{
            //         'Content-Type': 'application/json',
            //         'x-auth-token': localStorage.getItem('token')
            //     }   
            //    });