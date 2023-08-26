//navbar.tsx

import { Link, useNavigate } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { useEffect, useContext } from 'react';
import { UserContext } from './userprovider';
import './navbar.css';
import hexagonIcon from './assets/hexagon.png';

export default function Navbar() {
  const navigate = useNavigate();
  
  const userContext = useContext(UserContext);
  if (!userContext) {
    console.error("UserContext is not available.");
    return null; // Or handle the error in another way
  }

  const { userEmail, setUserEmail } = userContext;

  useEffect(() => {
    async function fetchUserEmail() {
        try {
            const user = await Auth.currentAuthenticatedUser();
            setUserEmail(user.attributes.email);
        } catch (error) {
            console.log('Error fetching user email:', error);
        }
    }

    fetchUserEmail();  // Fetch the user email unconditionally
}, []);

  const handleLogout = async () => {
    try {
      console.log('Logout');
      await Auth.signOut();
      setUserEmail(''); // Clear the userEmail on logout
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="nav">
      <div className="site-title-container">
        <img src={hexagonIcon} alt="Hexagon Icon" className="icon" />
        <Link to="/" className="site-title" style={{ color: "#8000FF" }}>
          Hexstation
        </Link>
      </div>

      {userEmail ? (
        <>
          <div className="username">Hello, {userEmail}</div>
          <ul className="ulmain">
            <li className="active">
              <Link to="/panel">Panel</Link>
            </li>
            <li className="active">
              <Link to="/pricing">Pricing</Link>
            </li>
            <li className="active">
              <Link to="/home" onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </>
      ) : (
        <ul className="ulmain">
          <li className="active">
            <Link to="/pricing">Pricing</Link>
          </li>
          <li className="active">
            <Link to="/login">Sign In/Up</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
