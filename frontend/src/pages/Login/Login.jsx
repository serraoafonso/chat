import React, {useState, useContext} from 'react'
import Bot from '../../assets/chatbot.jpg'
import {Link} from 'react-router-dom'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'

export default function Login() {

  
  const navigate = useNavigate()

  const {user, verifyUser} = useContext(UserContext)

  const [dados, setDados] = useState({
    username: "",
    password: ""
  })
  
  function handleChange(e){
    setDados((prev)=>({...prev, [e.target.name]: e.target.value}))
  }

  async function handleSubmit(e){
    e.preventDefault()
    try{
      const res = await fetch(`http://localhost:3000/api/user/login`, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(dados),
        headers: {'Content-type': 'application/json'}
      }) 
      console.log(res)
      if(res.status != 200){
        alert('User or password wrong')
        //setDados({username: '', password: ''})
      }else{
        const jsonData = await res.json()
        alert('User loged in')
        verifyUser({id: jsonData.id, username: jsonData.username})
        navigate('/')
      }
    }catch(err){
      alert('Erro')
      console.log(err)
      //setDados({username: '', password: ''})
    }
  }
  return (
    <div className='main'>
      <div className="a"></div>
      <div className="imagem">
        <img src={Bot} className='img' />
      </div>
      <div className="a"></div>
      <div className="form">
        <h1>Log in</h1>
        <form className='form-real'>
          <label style={{display: 'block'}}>Username:</label>
          <input type="text" name="username" value={dados.username} onChange={handleChange}/>
          <label style={{display: 'block'}}>Password:</label>
          <input type="password" name='password' value={dados.password} onChange={handleChange}/>
          <button onClick={handleSubmit} className='submete'>Submit</button>
        </form>
        <p className='p'>Don't have an account? <Link to="/register">Sign in</Link></p>
      </div>
      <div className="b"></div>
    </div>
  )
}
