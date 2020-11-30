import React from 'react'
import { SearchBar } from '../searchbar/SearchBar'
import './Dashboard.css'
export const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="searchbar-container">
            <SearchBar/>
            </div>
        </div>
    )
}
