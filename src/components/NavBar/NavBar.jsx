import { Link } from 'react-router-dom';


const NavBar = ({ user, handleSignout }) => {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">CHHP Inventory</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      { user ? (
        <>
       <li className="nav-item"><Link className="nav-link"  to="/">Home</Link></li>
       <li className="nav-item"><Link className="nav-link"  to="/walk-in-refrigerator">Walk-in Refrigerator</Link></li>
       <li className="nav-item"><Link className="nav-link"  to="/walk-in-freezer">Walk-in Freezer</Link></li>
       <li className="nav-item"><Link className="nav-link"  to="/store-room">Store Room</Link></li>
       <li className="nav-item"><Link className="nav-link"  to="/beer">Beer</Link></li>
       <li className="nav-item"><Link className="nav-link"  to="/dining-area">Dining Area</Link></li>
       <li className="nav-item"><Link className="nav-link"  to="/kitchen">Kitchen</Link></li>
       <li className="nav-item"><Link className="nav-link"  to="" onClick={handleSignout}>Sign Out</Link></li>
        </>
      ) : (
        <>
            <li className="nav-item"><Link className="nav-link"  to="/signin">Sign In</Link></li>
            <li className="nav-item"><Link className="nav-link"  to="/signup">Sign Up</Link></li>
        </>
      )}
     </ul>   
    </div>
  </div>
</nav>
     
    </>
  )
}


export default NavBar;
  