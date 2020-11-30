import React from 'react'
import './SearchBar.css'
import searchicon from './search.svg'
export const SearchBar = () => {
    return (
        <div className="searchbar">
            <div className="search-icon-container">
              <img src={searchicon} />
             
            </div>
            <input type="text" className="search-input" placeholder="search..." id=""/>
        </div>
    )
}
