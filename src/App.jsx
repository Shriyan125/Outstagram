import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css';
import Stories from './Components/Stories/Stories';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Stories />
    </>
  )
}

export default App
