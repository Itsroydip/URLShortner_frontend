import {Login, Register, Dashboard, Redirect, Links, Analytics, Settings} from './pages'
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
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/:shortId" element={<Redirect />} />
        </Routes>      
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
