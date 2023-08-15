import { Link } from "react-router-dom"
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './navbar.css'
import hexagonIcon from './assets/hexagon.png'; // Import the icon image


export default function Navbar(props) {
  // @ts-ignore
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    async function fetchUserEmail() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUserEmail(user.attributes.email);
      } catch (error) {
        console.log('Error fetching user email:', error);
      }
    }

    if (props.isAuthenticated) {
      fetchUserEmail();
    }
  }, [props.isAuthenticated]);

  const handleLogout = async () => {
    try {
      console.log('Logout');
      await Auth.signOut();
  
      props.updateAuthStatus(false);
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

      {props.isAuthenticated !== false ? (
          <div className="username">Hello, {userEmail}</div> 
        ) : null }
      <ul className="ulmain">

      {props.isAuthenticated !== false ? (
        <li className="active">
          <Link to="/panel">Panel</Link>
        </li>
        ) : null }

      <li className="active">
          <Link to="/pricing">Pricing</Link>
        </li>
        {props.isAuthenticated !== false ? (
        <li className="active">
            <Link to="/home" onClick={handleLogout}>Logout</Link>
        </li>
        ) : (
          <li className="active">
            <Link to="/login">Sign In/Up</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
