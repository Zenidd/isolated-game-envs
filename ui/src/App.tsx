//App.tsx

import { useState } from 'react';
import { Route, Routes} from "react-router-dom"

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

import './App.css'
import "./sections.css"
import '@aws-amplify/ui-react/styles.css';


import Navbar from './navbar.tsx';
import Home from './pages/home.tsx';
import Panel from './panel.tsx';
import Pricing from './pages/pricing.tsx';
import Footer from './footer.tsx';
import Login from './components/auth/login.tsx';


Amplify.configure(awsExports);


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  function updateAuthStatus(authStatus: boolean, email = '') {
    setIsAuthenticated(authStatus);
    setUserEmail(email);
  }
  return (
    <>
    
      <Navbar isAuthenticated={isAuthenticated}
        userEmail={userEmail}
        updateAuthStatus={updateAuthStatus}/>
      <div className="sections-container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/nome" element={<Home/>} />
          <Route path="/login" element={<Login updateAuthStatus={updateAuthStatus} />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/panel" element={<Panel />} />
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
