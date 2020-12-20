import React from 'react'
import { Link } from 'react-router-dom'
import './Gate.css'
import gateImg from './security-gate.svg'
export const Gate = ({name,topic,apiKey}) => {
    return (
        <div className="gate">
            <div className="gateImg-container">
                <img src={gateImg} />
            </div>
             <p>
                 {name}
             </p>
             <Link to={{
                            pathname: '/dashboard/'+name,
                            state: {
                                topic: topic,
                                apiKey: apiKey
                            }}} >
             <button className="gate-btn">
                 visit
             </button>
             </Link>

        </div>
    )
}
