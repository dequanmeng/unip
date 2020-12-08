import React from 'react'


// import axios from 'axios';
import config from '../config/config';

export const useFetch = (url, options={}) => {
    // url, options
  

        const [response, setResponse] = React.useState([]);
      
        const [error, setError] = React.useState(null);
        const [isLoading, setIsLoading] = React.useState(false);
        React.useEffect(() => {
          const fetchData = async () => {
            setIsLoading(true);
            try {
              const res = await fetch(
                config.baseUrl+url,{
                    method:'GET',
                        headers:{
                            'Content-Type': 'application/json',
                            'x-auth-token': localStorage.getItem('token')
                        }   
                       }
              )    
              const data=await res.json()  
              console.log('----useFetch----')
              console.log(data)
              console.log('----------------')
           
              if (data.length){
                setResponse(data);
               
                setIsLoading(false)
            
              }else{
                setIsLoading(false)
                setError(data);
              }
      

            } catch (err) {
              setError(err);
            }
          };
          fetchData();
        }, []);
        return { response, error, isLoading };
         
 
}
      // await axios.get(config.baseUrl+url,{
            //     headers:{
            //         'Content-Type': 'application/json',
            //         'x-auth-token': localStorage.getItem('token')
            //     }   
            //    });