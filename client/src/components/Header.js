import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
    const location = useLocation()
    return (
        <div style={{ marginTop: '15px', paddingBottom: '20px', borderBottom: '3px solid', color: 'black'}} className="borderBottom">
            <Link to="/" style={{ textDecoration: 'none', color: 'black'}}>
                <h1 style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                    DNA Pattern Matching
                </h1>
            </Link>
            {location.pathname === '/' ? 
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to="/add" style={{ textDecoration: 'none', color: 'white' }}>Add Disease</Link>
                <Link to="/history" style={{ textDecoration: 'none', marginLeft: '20px', color: 'white' }}>History</Link>
            </div> 
            : <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
            </div>}
        </div>
    )
}

export default Header