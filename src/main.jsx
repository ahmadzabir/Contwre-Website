import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

// Optimize for production - StrictMode only in development
const root = ReactDOM.createRoot(document.getElementById('root'))
const AppComponent = <App />

if (import.meta.env.DEV) {
  root.render(<React.StrictMode>{AppComponent}</React.StrictMode>)
} else {
  root.render(AppComponent)
}












