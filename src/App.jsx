import {Login, Register, Dashboard, Redirect, Links} from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import {Toaster} from 'react-hot-toast'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/links" element={<Links />} />
          {/* <Route path="/analytics" element={<Sidebar />} />
          <Route path="/settings" element={<Sidebar />} /> */}
          <Route path="/:shortId" element={<Redirect />} />
        </Routes>      
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
