import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

export const Card = ({image,imageSize='33%',name,title='',link='/'}) => {
    return (
        <div className="card">
            <div className="cardImg-container" >
                <img src={image} style={{width:imageSize}}/>
            </div>
             <p>{title}</p>
             <Link to={link}>
             <button className="card-btn">
                 {name}
             </button>
             </Link>

        </div>
    )
}
