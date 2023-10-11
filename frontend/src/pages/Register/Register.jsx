import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import People from '../../assets/Live-Chat-illustration.webp'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'

export default function Register() { 

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
      const res = await fetch(`http://localhost:3000/api/user/register`, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(dados),
        headers: {'Content-type': 'application/json'}
      }) 
      console.log(res)
      if(res.status != 200){
        alert('User already exists')
        //setDados({username: '', password: ''})
      }else{
        const jsonData = await res.json()
        alert('User registered')
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
      <div className="form">
        <h1>Register</h1>
        <form className='form-real'>
          <label style={{display: 'block'}}>Username:</label>
          <input type="text" name="username" onChange={handleChange} value={dados.username}/>
          <label style={{display: 'block'}}>Password:</label>
          <input type="password"  name="password" onChange={handleChange} value={dados.password}/>
          <button onClick={handleSubmit} className='submete'>Submit</button>
        </form>
        <p className='p'>Already have an account? <Link to="/login">Login</Link></p>
      </div>
      <div className="b"></div>
      <div className="imagem">
        <img src={People} className='img' />
      </div>
      <div className="a"></div>
    </div>
  )
}
