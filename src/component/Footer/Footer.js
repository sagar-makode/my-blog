import React from 'react'
import "./footer.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Footer() {


    const navigate = useNavigate();

    const location = useLocation();

    // Define an array of paths where the footer should be hidden
    const hideFooterPaths = ['/login', '/register', '/dashboard', "/liveexam", "/result",'/allcreators','/alltest','/forgot'];

    // Check if the current path is in the array of paths where the footer should be hidden
    const shouldHideFooter = hideFooterPaths.includes(location.pathname);

    // If the current path is in the array, don't render the footer
    if (shouldHideFooter) {
        return null;
    }

    const handleCategoryClick = (search) => {
        navigate(`/tag/${search}`);
      };
    

    return (

        <>
            <div style={{ textDecoration: 'none', marginTop: "14px" }}>

                <footer className=" text-lg-start footertext" style={{ backgroundColor: '#ffffd5' }}>

                    <div className="container-fluid footerpadding">
                        <section className="">
                            <div className="row">
                                {/* col-lg-3 col-md-4 col-sm-6  */}
                                <div className="col-lg-3 col-md-4 col-sm-6 col-6 mx-auto mt-3 footertitle">
                                    <h5 className="  font-weight-bold  " >Quick Links</h5>
                                
                                    <p>
                                        <Link to="/"  style={{ textDecoration: 'none' }}>
                                            <i className="fa fa-users" style={{ marginRight: '5px' }} > </i>
                                            होम</Link>
                                    </p>
                                    <p>
                                        <Link to="/aboutus"  style={{ textDecoration: 'none' }}>
                                            <i className="fa fa-users nav-item" style={{ marginRight: '5px' }} > </i>
                                            आमच्या बद्दल</Link>
                                    </p>
                                    <p>
                                        <Link  style={{ textDecoration: 'none' }}>
                                            <i className="fa fa-user-secret" style={{ marginRight: '5px' }} > </i>

                                            Privacy Policy</Link>
                                    </p>
                                    <p>
                                        <Link  style={{ textDecoration: 'none' }}>
                                            <i className="fa fa-lock" style={{ marginRight: '5px' }}> </i>

                                            Term & Condition</Link>
                                    </p>
                                    <hr className="w-100 clearfix d-md-none" />

                                </div>



                                <div className="col-lg-3 col-md-4 col-sm-6 col-6  mx-auto mt-3 footertitle">
                                    <h5 className=" font-weight-bold " >Links</h5>


                                    <p>
                                        <p onClick={() => handleCategoryClick('सरकारी योजना')} className='text-primary pointer' >
                                        सरकारी योजना

                                        </p>
                                    </p>
                                    <p>
                                        <p onClick={() => handleCategoryClick('स्कॉलरशिप')} className='text-primary pointer' >
                                        स्कॉलरशिप

                                        </p>
                                    </p>
                                    <p>
                                        <p onClick={() => handleCategoryClick('मराठी बातम्या')}  className='text-primary pointer' >
                                        मराठी बातम्या

                                        </p>
                                    </p>
                                    <p>
                                        <p onClick={() => handleCategoryClick('ऑनलाइन फॉर्म')}  className='text-primary pointer' >
                                        ऑनलाइन फॉर्म

                                        </p>
                                    </p>
       

                                    <hr className="w-100 clearfix d-md-none" />

                                </div>


                                <div className="col-lg-3 col-md-4 col-sm-6  col-6 mx-auto mt-3 footertitle">
                                    <h5 className="font-weight-bold" >
                                    Help & Support
                                    </h5>
                                    <p>
                                        <Link to="https://chat.whatsapp.com/EStqyXcuBCa6nte3GyVziK" target="_blank" style={{ textDecoration: 'none' }} >
                                            <i className="fa fa-chevron-right" ></i> व्हॉट्सअँप

                                        </Link>
                                    </p> <p>
                                        <Link to="https://t.me/formsolution"  target="_blank" style={{ textDecoration: 'none' }} >
                                            <i className="fa fa-chevron-right" ></i> टेलिग्राम

                                        </Link>
                                    </p> <p>
                                        <Link to="https://www.instagram.com/formsolution_official" target="_blank" style={{ textDecoration: 'none' }} >
                                            <i className="fa fa-chevron-right" ></i> इंस्टाग्राम

                                        </Link>
                                    </p> <p>
                                        <Link to="https://www.youtube.com/c/Formsolution" target="_blank"  style={{ textDecoration: 'none' }} >
                                            <i className="fa fa-chevron-right" ></i> यूट्यूब

                                        </Link>
                                    </p>

                                </div>



                                {/* Grid column */}
                                <div className="col-lg-3 col-md-4 col-sm-6 col-6 mx-auto mt-3 footertitle">
                                    <h5 className=" font-weight-bold" style={{ textAlign: "center" }}> Send Massage Here </h5>
                                    <form >
                                        <div className="mb-3 " style={{ textAlign: "center" }}>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your Message"
                                                style={{ textAlign: "center" }}
                                            // value={userFeedback}
                                            // onChange={handleFeedbackChange}
                                            />
                                            <button type="submit" className="btn btn-light my-2" >
                                                Send
                                                <i className="fa fa-paper-plane " style={{ marginLeft: "6px" }} ></i>
                                            </button>
                                        </div>


                                    </form>
                                </div>
                            </div>
                        </section>

                        <hr className="my-1" />

                        <section className="pb-2">
                            <div className="row d-flex align-items-center">
                                <div className="col-md-7 col-lg-8 text-center text-md-start">
                                    <div className="p-3">
                                        © 2024 Copyright : &nbsp;
                                        <Link  to="/">
                                            Form Solution
                                        </Link>
                                    </div>
                                </div>
                              
                              

                                <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                                    <Link className=" btn btn-outline-light btn-floating m-1 text-white icon-hover" role="button">
                                        <i className="fab fa-facebook-f"></i>
                                    </Link>
                                    <Link className="btn btn-outline-light btn-floating m-1 text-white icon-hover" role="button">
                                    <i className="fab fa-youtube"></i>
                                    </Link>


                                    <Link className="btn btn-outline-light btn-floating m-1 text-white icon-hover" role="button">
                                    <i className="fab fa-twitter"></i>
                                    </Link>

                                    <Link className="btn btn-outline-light btn-floating m-1 text-white icon-hover" role="button">
                                    <i className="fab fa-instagram"></i>
                                    </Link>

                                    <Link className="btn btn-outline-light btn-floating m-1 text-white icon-hover" role="button">
                                    <i className="fab fa-linkedin-in"></i>
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer