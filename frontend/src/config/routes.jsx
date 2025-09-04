import React from 'react'
import { Route, Routes } from 'react-router'
import App from '../App'
import { Chatpage } from '../components/chatPage.jsx'

//for pages creation
//routes-> Approutes
const Approutes = () => {
return (
<Routes>
    {/* <CursorDot/> */}
    <Route path="/" element={<App />} />
    <Route path="/Chatpage" element={<Chatpage/>} />
    <Route path="*" element={<h1>404 not Found</h1>} />
    
</Routes>
)
}
export default Approutes