import React, { useContext, useEffect, useRef, useState } from 'react';
import './navbar.css';
import logopng from '../../assets/images/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../Admin/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const navbarRef = useRef(null);
  const { isAuthenticated, logout } = useContext(AuthContext);


  const handleCategoryClick = (search) => {
    navigate(`/tag/${search}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const trimmedSearchTerm = searchTerm.trim(); // Trim spaces
    if (trimmedSearchTerm) {
      navigate(`/search/${trimmedSearchTerm}`); // Use trimmed term
      setSearchTerm('');
      setIsNavbarOpen(false); // Close navbar on search
    }
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsNavbarOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleCombinedClick = (searchTerm) => {
    handleCategoryClick(searchTerm);
    closeNavbar();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" ref={navbarRef}>
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logopng} alt="Form Solution Logo" style={{ width: '50px', marginRight: '10px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>Form Solution</span>
              <span style={{ fontWeight: 'bold', fontSize: '17px', color: 'red' }}>फॉर्म सोल्यूशन</span>
            </div>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
            aria-controls="navbarScroll"
            aria-expanded={isNavbarOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 mx-auto" style={{ "--bs-scroll-height": "100px" }}>
              {/* <li className="nav-item">
                <Link className="nav-link active" aria-current="page" onClick={closeNavbar} to="/">Login</Link>
              </li> */}
              {/* <li className="nav-item">
                <button className="nav-link active" aria-current="page" onClick={() => handleCombinedClick('सरकारी योजना')}>सरकारी योजना</button>
              </li>
              <li className="nav-item">
                <button className="nav-link active" aria-current="page" onClick={() => handleCombinedClick('स्कॉलरशिप')}>स्कॉलरशिप</button>
              </li>
              <li className="nav-item">
                <button className="nav-link active" aria-current="page" onClick={() => handleCombinedClick('मराठी बातम्या')}>मराठी बातम्या</button>
              </li>
              <li className="nav-item">
                <button className="nav-link active" aria-current="page" onClick={() => handleCombinedClick('ऑनलाइन फॉर्म')}>ऑनलाइन फॉर्म</button>
              </li> */}

              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" onClick={closeNavbar} to="/admin/createblog">नवीन ब्लॉग बनवा</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" onClick={closeNavbar} to="/admin/dashboard">सर्व बनवलेले ब्लॉग</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" onClick={(e) => { handleLogout(); closeNavbar(); }}>लॉग आऊट</Link>
                  </li>


                </>
              ) : ("")}

            </ul>
            {/* <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn" type="submit" style={{ margin: '0', padding: '0' }}>
                <span className="material-symbols-outlined">search</span>
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
