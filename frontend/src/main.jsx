import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {} from 'react-router-dom'
import { UserContextProvider } from './context/userContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
)
