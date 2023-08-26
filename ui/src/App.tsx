//App.tsx

import { Route, Routes } from "react-router-dom";

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

import './App.css';
import "./sections.css";
import '@aws-amplify/ui-react/styles.css';

import Navbar from './navbar.tsx';
import Home from './pages/home.tsx';
import Panel from './panel.tsx';
import Pricing from './pages/pricing.tsx';
import Footer from './footer.tsx';
import Login from './login.tsx';
import UserProvider from './userprovider.tsx';

Amplify.configure(awsExports);

function App() {
  return (
    <UserProvider>
      <>
        <div className="background">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <Navbar />
        <div className="sections-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/panel" element={<Panel />} />
          </Routes>
        </div>
        <Footer />
      </>
    </UserProvider>
  );
}

export default App;
