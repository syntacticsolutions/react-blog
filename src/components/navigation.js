import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd';

const navLinks = [
    {
      title: 'Home',
      path: '/'
    },
    {
      title: 'Blog',
      path: '/blog'
    },
    {
      title: 'Contact Us',
      path: '/contact-us'
    },
    {
      title: 'Login',
      path: '/login'
    }
  ]

export default function Navigation () {
    const [menuActive, setMenuActive] = useState(false)

    return (
    <nav className={`site-navigation ${menuActive && 'active'}`} role="navigation">
        <span className="menu-title">My Awesome Blog</span>
        <div
            className="menu-content-container"
        >
            <ul>
            { navLinks.map((link, index) => (
                <li key={index}>
                    <Link to={link.path}>{link.title}</Link>
                </li>
                ))
            }
            </ul>
            <div className="menu-avatar-container">
                <Avatar size={50} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <span className="menu-avatar-name">Miguel Coder</span>
            </div>
        </div>
        <i 
            className="icon ionicons ion-ios-menu"
            onClick={(ev) => setMenuActive(!menuActive)}
        />
    </nav>
  )
}