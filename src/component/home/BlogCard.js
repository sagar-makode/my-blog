import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllblogs } from '../actions/createblogActions';
import './navbar.css'
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
const BlogCard = () => {

  const allblogData = useSelector(state => state.createblog.allblogs);
  const loading = useSelector(state => state.createblog.loading);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchAllblogs());
  }, [dispatch]);

  const handleReadMore = (blog) => {
    navigate(`/${blog.title}`); // Adjust the route as needed
  };
  return (
    <div>
      {loading ? (

        <div className="d-flex justify-content-center align-items-center text-primary" style={{ height: '50vh' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (<div className="container">
        <div className="row">
          {allblogData && allblogData.length > 0 ? (
            allblogData.map((blog, index) => {
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
      </div>)}

    </div>


  );
};

export default BlogCard;
