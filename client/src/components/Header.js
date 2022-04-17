import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
    const location = useLocation()
    return (
        <div style={{ marginTop: '15px' }}>
            <h1 style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                DNA Pattern Matching
            </h1>
            {location.pathname === '/' ? 
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to="/add" style={{ textDecoration: 'none'}}>Add Disease</Link>
                <Link to="/history" style={{ textDecoration: 'none', marginLeft: '20px' }}>History</Link>
            </div> 
            : <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
            </div>}
        </div>
    )
}

export default Header