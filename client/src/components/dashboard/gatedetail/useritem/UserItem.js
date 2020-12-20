import React, { useEffect, useState } from 'react'
import './UserItem.css'
import moment from 'moment';
import userIcon from './user.svg'
import { useFetch } from '../../../../hooks/useFetch';
// import { useTime} from '../../../../hooks/useTime'
// import { Badge } from '@material-ui/core'

export const UserItem = ({status,user,time,active}) => {
//    const time =useTime()
//    const {response,error,isLoading}=useFetch('/users/'+user)
//    console.log(response,user,error);
    return (
        <div className="useritem">
            <div className="user_profile">
                
              
                    <img src={userIcon}/>
              
                <p>{user?.firstName+' '+user?.lastName}</p>
            </div>
        
            <div className="user_status">
                <p>status: <span className={status&&active!=3?"status-inside":(active==3?"status-yellow":"status-outside")}>{status?"inside":"outside"}</span> </p>
            </div>
            <div className="user_last_activity">
                <p style={{marginRight:'1rem'}}>last activity: </p>
                <span>{ moment(time).format('h:mm a')}</span>
            </div>
        </div>
    )
}
