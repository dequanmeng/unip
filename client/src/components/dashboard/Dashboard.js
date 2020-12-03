import React, { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'

import { SearchBar } from '../searchbar/SearchBar'
import './Dashboard.css'
import { Gate } from './gate/Gate'

export const Dashboard = () => {
  
  const res = useFetch("/gates", {});
  const [data, setdata] = useState()


  useEffect(() => {
    setdata(res.response)

    
  }, [res.response])
 
 
  const filter=(e)=>{
  
     
     setdata(
     res.response?.filter(
                item => {return item.name.toLowerCase().includes(e.target.value.toLowerCase())}
            )
      )
  
  }

  
    return (
        <div className="dashboard">
            <div className="searchbar-container">
            <SearchBar filter={filter}/>
            </div>
            <div className="gate_container">
            
        {
           
             res?.isLoading ?'loading...':data?.map(gate => 
             { 
               
              return <Gate key={gate._id} name={gate.name}/>
            
             }
              
              )
           
           
        }

            </div>
        </div>
    )
}
