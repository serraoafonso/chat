import React, { useContext } from 'react'
import './navbar.css'
import { UserContext } from '../../context/userContext'

export default function Navbar() {
  const {user, verifyUser} = useContext(UserContext)

  function handleLogOut(){
    verifyUser(null)
  }

  return (
    <div className='nav'>
      <header className='header'>
      <h1>MyChat</h1>
      </header>
      <menu className='menu'>
      <span>{user.username}</span>
      <button className='botao' onClick={handleLogOut}>Log out</button>
      </menu>
    </div>
  )
}
