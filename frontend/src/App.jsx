import { useState } from 'react'
import './App.css'
import toast from 'react-hot-toast'
import RoomJC from './components/RoomJC.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RoomJC/> 
    </div>
  );
}
export default App
