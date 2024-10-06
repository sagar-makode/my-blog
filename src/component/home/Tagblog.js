import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAllblogs } from '../actions/createblogActions';

function Tagblog() {

    const { search } = useParams(); // Extract the tag from the URL



const allblogData = useSelector(state => state.createblog.allblogs);

const dispatch = useDispatch()

useEffect(() => {
    dispatch(fetchAllblogs());
}, [dispatch]);


    
    const filteredBlogs =  allblogData.filter(blog => blog.tag === search);
    const navigate = useNavigate()

    const handleReadMore = (blog) => {
        navigate(`/${blog.title}`); // Adjust the route as needed
      };


  return (
    <div className="container mt-5">
    <div className="row">
      {filteredBlogs && filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog, index) => {
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
  )
}

export default Tagblog