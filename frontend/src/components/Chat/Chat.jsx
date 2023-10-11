import React, { useContext, useState } from 'react'
import './chat.css'
import Search from '../../assets/loupe.png'
import { UserContext } from '../../context/userContext'
import { useEffect } from 'react'

export default function Chat() {

  const [search, setSearch] = useState()
  const {user} = useContext(UserContext)
  const [users, setUsers] = useState([])
  const [usersFalados, setUsersFalados] = useState([])
  const [userTalking, setUserTalking] = useState(null)
  const [currentTalking, setCurrentTalking] = useState([])
  const [input, setInput] = useState('')

  function escrever(u){
      let li = []
      users.forEach((user)=>{
        let largura = u.length;
        if(user.username.toUpperCase()==u.toUpperCase() || u.toUpperCase() == user.username.slice(0, largura).toUpperCase()){
          li.push(<span onClick={changeUserTalking(user.username)} key={user.username}>{user.username}</span>)
        }
      })
      return li
  }

  async function getUsers(){
    try{
      const data = await fetch('http://localhost:3000/api/user/get')
      if(data.status != 200){
        alert('Erro')
      }else{
        const d = await data.json()
        setUsers(d)
        console.log(d)
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
  getUsers()
  }, [])

  async function getUsersFalados(){
    try{
      const res = await fetch(`http://localhost:3000/api/message/gettalk/${user.id}`, {
        credentials: 'include'
      })
      if(res.status != 200){
        throw new Error(JSON.stringify(res))
      }else{
        const data = await res.json()
        console.log(data, 'data')
        setUsersFalados(data)
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
  getUsersFalados()
  }, [])

  async function changeUserTalking(username){
    try{
      const res = await fetch(`http://localhost:3000/api/message/conversation/${user.id}`, {
        method: 'post',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({username})
      })
      console.log(res)
      if(res.status != 200){
        alert('err')
      }else{
        const data = await res.json();
        const d = data.reverse()
        setCurrentTalking(d)
        setUserTalking(username)
      }
    }catch(err){
      console.log(err)
    }
  }

useEffect(()=>console.log(currentTalking), [currentTalking, userTalking])

  async function handlePost(){
    try{
      const res = await fetch(`http://localhost:3000/api/message/post/${user.id}`, {
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({username: userTalking, message: input}),
        credentials: 'include'
      })
      console.log(res)
      if(res.status != 200){
        alert('erro')
      }else{
       setInput('')
       changeUserTalking(userTalking)
      }
    }catch(err){
       console.log(err)
    }
    setInput('')
  }

  return (
    <div className='mainChat'>
      <div className="caixa">
        <div className="left">
          <div className="searchBar">
            <div className="bar">
              <img src={Search} className='search'/>
              <input type="text" placeholder='Search username' className='inputSearch' value={search} onChange={(e)=>setSearch(e.target.value)}/>
            </div>
          </div>
          {search?.length >= 1 ? (
  <div className="escrever">{escrever(search)}</div>
) : (
  null // You can also use an empty div or any other element here
)}

<div className="pessoas">
  {usersFalados.map((userItem) => (
    userItem.nome_usuario != user.username ? 
    <div id={userItem.nome_usuario} className="pessoa" key={userItem.ultima_mensagem_id} onClick={()=>changeUserTalking(userItem.nome_usuario)}>
      <p>{userItem?.nome_usuario}</p>
      <span>{userItem?.ultima_mensagem}</span>
    </div>
  :''))}
</div>

        </div>
          {
            userTalking ? (
              <div className="right">
            <div className="top">
              <span>{userTalking}</span>
            </div>
            <div className="mensagens">
              {
                currentTalking.map((message)=>(
                  message.idSend === user.id ? <div className="mensagemPropia" key={message.id}>{message.message}</div> : <div className="mensagemDoutro" key={message.id}>{message.message}</div>
                ))
              }
                
            </div>  
            <div className="escreve">
            <input type="text" placeholder='Write your message' className='teclado' value={input} onChange={(e)=>setInput(e.target.value)}/>
            <button className='send' onClick={handlePost}>Send</button> 
            </div>
            </div>
            ) : <div className="right">
              <p>Please select an user to talk</p>
            </div>
          }  
      </div>
    </div>
  )
}
