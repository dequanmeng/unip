import  { useEffect, useState } from 'react'
import moment from 'moment';
export const useTime = () => {

    const [time, settime] = useState(moment().format('h:mm a'))
    useEffect(() => {
        const x=setInterval(() => {
            settime(moment().format('h:mm a')) 
         }, 60*1000)
        return () => {
            clearInterval(x)
        }
    }, [])
    return time 
}
