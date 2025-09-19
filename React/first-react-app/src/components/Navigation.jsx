
import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
    const liStyle = {
        listStyle: 'none',
        marginLeft: '16px',
        padding: '8px'
    }

    const ulStyle = {
        display: 'flex'
    }

    const linkStyle = {
        textDecoration: 'none',
    }

    return (
        <nav>
            <ul style = {ulStyle}>
                <li style= {liStyle}>
                    <Link to="/" style={linkStyle}>Home</Link>
                </li>
                <li style= {liStyle}>
                    <Link to='/About' style = {linkStyle}>About</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;