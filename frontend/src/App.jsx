import React, { useContext, useState } from 'react'; // Import React and useState
import { createBrowserRouter, RouterProvider, Route, Navigate } from 'react-router-dom'; // Import Route
import Navbar from './components/Navbar/Navbar';
import Chat from './components/Chat/Chat';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import './App.css'
import { UserContext } from './context/userContext';

function Layout() {
  return (
    <main className='principal'>
      <div className="navbar">
        <Navbar/>
      </div>
      <div className="chat">
        <Chat/>
      </div>

    </main>
  );
}

function ProtectedRoute({ children }) {
  const {user} = useContext(UserContext)
  if (user == null){ return <Navigate to="/login" />;
}else{
  return children;
}
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
