import './App.css'
import "./sections.css"
import Navbar from './navbar.tsx';
import Pricing from './pages/pricing.tsx';
import Panel from './panel.tsx';
import Home from './pages/home.tsx';
import Footer from './footer.tsx';
import { Route, Routes} from "react-router-dom"

function App() {

  return (
    <>
      <Navbar />
      <div className="sections-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nome" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/panel" element={<Panel />} />
      </Routes>
      </div>
    <Footer/>
    </>
  )
}

export default App
