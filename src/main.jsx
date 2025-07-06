import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
//import Home from './pages/home.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='nerverse_breakdownApp/vertification/'>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
