import React, { useEffect } from 'react';
import mainbg from '../../assets/images/mainbg.png';
import { TypeAnimation } from 'react-type-animation';
import BlogCard from './BlogCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllblogs } from '../actions/createblogActions';


function Home() {

  const allblogData = useSelector(state => state.createblog.allblogs);
  const visibleblogdata =  allblogData.slice(0, 6);

  const filteredBlogssarkaariyojana =  allblogData.filter(blog => blog.tag === 'सरकारी योजना');
  
  
  const visiblesarkaariyojanablogdata =  filteredBlogssarkaariyojana.slice(0, 6);

  const dispatch = useDispatch()
const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchAllblogs());
  }, [dispatch]);

  const handleReadMore = (blog) => {
    navigate(`/${blog.title}`); // Adjust the route as needed
  };

  const handelShowallblogs = () => {
    navigate('/allblogs')
}
const handleCategoryClick = (search) => {
  navigate(`/tag/सरकारी योजना`);
};
  return (
    <div>
      <div className="image-container">
        <img src={mainbg} alt="Placeholder" className="img-fluid w-100" />
        <div className="text-overlay">
          <h1 className="animated-text marathi-font">
            मराठी माहिती साठी एक स्टॉप सोल्यूशन
            <span style={{ color: 'red' }}>
            <TypeAnimation
              sequence={[
                ' फॉर्म सोल्युशन', // Show this text
                3000,              // Duration to show
                '',                 // Empty string to hide it
                3000,              // Duration to remain hidden
              ]}
              wrapper="span"
              speed={250}
              repeat={Infinity}   // Repeat the entire sequence
            />

            </span>
          </h1>
          <p className="description-text">
            "फॉर्म सोल्यूशन वेबसाइट विद्यार्थी, शेतकरी आणि CSC केंद्रचालकांसाठी एक स्टॉप सोल्यूशन आहे. आम्ही विविध सरकारी योजनांची सविस्तर माहिती, शिष्यवृत्तीच्या अर्ज प्रक्रिया, नवीनतम नोकरीच्या संधी आणि CSC संबंधित सर्व अपडेट्स प्रदान करतो. आमचे मार्गदर्शक तुम्हाला फॉर्म कसे भरायचे हे सोपे बनवतात
          </p>

        </div>


      </div>

      <div className="container">
      <div className="row">
        {visibleblogdata && visibleblogdata.length > 0 ? (
          visibleblogdata.map((blog, index) => {
            // Extract the image URL from blog.content
            const parser = new DOMParser();
            const doc = parser.parseFromString(blog.content, 'text/html');
            const imgElement = doc.querySelector('img');
            const blogImg = imgElement ? imgElement.src : ''; // Get the image URL or an empty string if no image is found

            return (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  {blogImg && (
                    <img src={blogImg} className="card-img-top" alt={blog.title} />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-link text-primary" style={{ textDecoration: 'none' }}
                    onClick={() => handleReadMore(blog)}
                    >अधिक वाचा &gt;&gt; </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No blogs available</p>
        )}
      </div>
    </div>


      <div className="text-center p-1"><button className="btn btn-primary" onClick={handelShowallblogs}>आणखी पहा</button></div>



      <h4 className='text-center m-4'><span style={{ color: "red" }}>-- </span> नविन सरकारी योजना<span style={{ color: "red" }}> --</span></h4>

      <div className="container">
      <div className="row">
        {visiblesarkaariyojanablogdata && visiblesarkaariyojanablogdata.length > 0 ? (
          visiblesarkaariyojanablogdata.map((blog, index) => {
            // Extract the image URL from blog.content
            const parser = new DOMParser();
            const doc = parser.parseFromString(blog.content, 'text/html');
            const imgElement = doc.querySelector('img');
            const blogImg = imgElement ? imgElement.src : ''; // Get the image URL or an empty string if no image is found

            return (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  {blogImg && (
                    <img src={blogImg} className="card-img-top" alt={blog.title} />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-link text-primary" style={{ textDecoration: 'none' }}
                    onClick={() => handleReadMore(blog)}
                    >अधिक वाचा &gt;&gt; </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No blogs available</p>
        )}
      </div>
    </div>

    <div className="text-center p-1"><button className="btn btn-primary" onClick={handleCategoryClick}>आणखी पहा</button></div>



    </div>
  );
}

export default Home;
