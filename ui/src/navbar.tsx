import { Link } from "react-router-dom"

export default function Navbar() {
return <nav className="nav">
  <Link to="/" className="site-title">ServerStation</Link>
  <ul>
    <li className="active"> 
      <Link to="/pricing" >Pricing</Link>
    </li>
    <li className="active"> 
      <Link to="/panel">Panel</Link>
    </li>
  </ul>
</nav>
}