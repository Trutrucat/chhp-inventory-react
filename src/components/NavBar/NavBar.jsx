import { Link } from 'react-router-dom';


const NavBar = ({ user, handleSignout }) => {
  return (
    <>
      { user ? (
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/walk-in-refrigerator">Walk-in Refrigerator</Link></li>
            <li><Link to="/walk-in-freezer">Walk-in Freezer</Link></li>
            <li><Link to="/store-room">Store Room</Link></li>
            <li><Link to="/beer">Beer</Link></li>
            <li><Link to="/dining-area">Dining Area</Link></li>
            <li><Link to="/kitchen">Kitchen</Link></li>
            <li><Link to="" onClick={handleSignout}>Sign Out</Link></li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </nav>
      )}
    </>
  )
}


export default NavBar;
  