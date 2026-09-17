import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import '@/refinement.css'
import { MotionConfig } from 'framer-motion'

ReactDOM.createRoot(document.getElementById('root')).render(
  <MotionConfig reducedMotion="user"><App /></MotionConfig>
)
