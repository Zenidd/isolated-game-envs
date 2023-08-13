import { Link } from "react-router-dom"
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './navbar.css'


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
      <Link to="/" className="site-title">ServerStation</Link>
     
      {props.isAuthenticated !== false ? (
          <div className="username">Hello, {userEmail}</div> 
        ) : null }
      <ul className="ulmain">



      <li className="active">
          <Link to="/pricing">Pricing</Link>
        </li>
        {props.isAuthenticated !== false ? (
        <li className="active">
            <Link to="/home" onClick={handleLogout}>Logout</Link>
        </li>
        ) : (
          <li className="active">
            <Link to="/login">Sign In/Sign Up</Link>
          </li>
        )}


        {props.isAuthenticated !== false ? (
        <li className="active">
          <Link to="/panel">Panel</Link>
        </li>
        ) : null }
      </ul>
    </nav>
  );
}
