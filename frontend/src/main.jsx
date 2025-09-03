import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import Approutes from './config/routes'
import { Toaster } from 'react-hot-toast'
import CursorDot from './components/CursorDot.jsx'
import { ChatProvider } from './Context/chatContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Toaster/>

   <ChatProvider>
    <Approutes/>
    </ChatProvider>
    <CursorDot/>
    </BrowserRouter>
  </StrictMode>
)
