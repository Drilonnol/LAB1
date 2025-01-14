import React from 'react'
import {Link} from "react-router-dom";
import "./Sidebar.css"
function Header() {
 
  return (
    <div>
      <nav className='navbar navbar-expand-sm navbar-dark mb-4'>
        <div className='container'>
        <Link className='navbar-brand' to='/'> 
          Menaxhimi i Spitalit
        </Link>
        </div>
      </nav>
    </div>
  )
}

export default Header