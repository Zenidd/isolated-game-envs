import { useState } from 'react'
import './App.css'
import "./sections.css"
import Navbar from './navbar.tsx';
import Pricing from './pages/pricing.tsx';
import Panel from './panel.tsx';
import Home from './pages/home.tsx';
import { Route, Routes} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <Navbar />
      <div className="sections-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/panel" element={<Panel />} />
      </Routes>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
