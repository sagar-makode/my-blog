import React, { useState } from 'react'
import './navbar.css'
import logopng from '../../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'


function Navbar() {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  const handleCategoryClick = (search) => {
    navigate(`/tag/${search}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const trimmedSearchTerm = searchTerm.trim(); // Trim spaces
    if (trimmedSearchTerm) {
      navigate(`/search/${trimmedSearchTerm}`); // Use trimmed term
      setSearchTerm('');
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logopng} alt="Form Solution Logo" style={{ width: '50px', marginRight: '10px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>Form Solution</span>
              <span style={{ fontWeight: 'bold', fontSize: '17px', color: 'red' }}>फॉर्म सोल्यूशन</span>
            </div>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 mx-auto " style={{ "--bs-scroll-height": "100px" }}>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">होम</Link>
              </li>
              <li className="nav-item">
                <button className="nav-link active" aria-current="page" onClick={() => handleCategoryClick('सरकारी योजना')}>सरकारी योजना</button>
              </li>
              <li className="nav-item">
                <button className="nav-link active" aria-current="page" onClick={() => handleCategoryClick('स्कॉलरशिप')}>स्कॉलरशिप</button>
              </li>
              <li className="nav-item">
                <button className="nav-link active" aria-current="page" onClick={() => handleCategoryClick('मराठी बातम्या')}>मराठी बातम्या</button>
              </li>
              <li className="nav-item">
                <button className="nav-link active" aria-current="page" onClick={() => handleCategoryClick('ऑनलाइन फॉर्म')}>ऑनलाइन फॉर्म</button>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/createblog">नवीन ब्लॉग</Link>
              </li>

            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn " type="submit" style={{ margin: "0", padding: "0" }}>   <span className="material-symbols-outlined" >
                search
              </span></button>

            </form>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar