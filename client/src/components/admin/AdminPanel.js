import React, { useEffect, useState } from 'react'
import { Card } from '../util/card/Card'
import './AdminPanel.css'
import usersicon from './users.svg'
import gatesicon from './security-gate.svg'
import { useFetch } from '../../hooks/useFetch'
export const AdminPanel = () => {
    const users=useFetch('/users')
    const gates=useFetch('/gates')
    const [data, setdata] = useState([])
    useEffect(() => {
        setdata([gates.response.length,users.response.length])
      
    }, [users.response,gates.response])
    return (
        <div className="admin-panel">
            <div className="card-container">
                <Card name={'users'} imageSize={'70%'} image={usersicon} title={data[1]} link='/admin/users'/>
                <Card name={'gates'} image={gatesicon} title={data[0]} link='/admin/gates'/>

            </div>
          
        </div>
    )
}
