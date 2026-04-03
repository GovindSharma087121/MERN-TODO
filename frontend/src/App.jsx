import { useState } from 'react'
import './style/App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'
import UpdateTask from './components/UpdateTask'
import Signup from './components/Signup'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProtectedRoute ><TaskList /></ProtectedRoute>}></Route>
        <Route path="/add" element={<ProtectedRoute ><AddTask /></ProtectedRoute>}></Route>
        <Route path="/update/:id" element={<UpdateTask />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  )
}

export default App
