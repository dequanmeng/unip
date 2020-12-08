
import config from '../config/config';

export const Post= async(url, data,options={}) => {
    // url, options
            try {
              const res = await fetch(
                config.baseUrl+url,{
                    method:'Post',
                    body: JSON.stringify(data),
                        headers:{
                            'Content-Type': 'application/json',
                            'x-auth-token': localStorage.getItem('token')
                        }   
                       }
              )    
              const data=await res.json()  
              console.log('----Post----')
              console.log(data)
              console.log('----------------')
           
              if (data.length){
                  return {data,err:false}
            
              }else{
                  return {data,err:true}
              }
      

            } catch (err) {
              return {data,err:true}
            }
        
      
      
         
 
}
     