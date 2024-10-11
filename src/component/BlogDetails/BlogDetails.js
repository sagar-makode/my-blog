import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllblogs } from '../actions/createblogActions';
import { Spinner } from 'react-bootstrap';

const LatestBlogs = ({ allblogData }) => {
    return (

        <div className="card-body">
            <h5 className="card-title">Latest Blogs</h5>
            <ul className="list-group">
                {allblogData.slice(0, 10).map((blog, index) => {
                    // Extract the image URL from blog.content
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(blog.content, 'text/html');
                    const imgElement = doc.querySelector('img');
                    const blogImg = imgElement ? imgElement.src : ''; // Get the image URL or an empty string if no image is found

                    return (
                        <li key={index} className="list-group-item d-flex align-items-center" style={{ textDecoration: "none" }}>
                            {blogImg && (
                                <img src={blogImg} alt={blog.title} className=" me-2" style={{ height: '50px' }} />
                            )}
                            <a href={`/blog/${encodeURIComponent(blog.title)}`} className="text-decoration-none">
                                {blog.title}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

const BlogDetails = () => {
    const { title } = useParams(); // Get the encoded title from the URL
    const allblogData = useSelector((state) => state.createblog.allblogs);
    const loading = useSelector(state => state.createblog.loading);

    const dispatch = useDispatch()

    // Find the selected blog using the decoded title
    const blog = allblogData.find((b) => b.title === title);
    useEffect(() => {
        dispatch(fetchAllblogs());
    }, [dispatch]);

    useEffect(() => {
        if (!blog) {
            // Handle case where the blog is not found
        } else {
            // Modify the image styles after rendering
            const images = document.querySelectorAll('.blog-content img');
            images.forEach((img) => {
                img.style.width = '100%';
                img.style.height = 'auto';
                img.style.marginBottom = '20px';
            });
        }
    }, [blog]);

    return (

        <div>
            <div>
                {loading ? (<div className="d-flex justify-content-center align-items-center text-primary" style={{ height: '50vh' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>) : (<div className="container mt-4">



                    <div className="user-profile-container container-fluid">
                        <div className="main-body">
                            <div className="row">

                                <div className="col-lg-8">
                                    <div className="card">
                                        <div className="card-body">

                                            {blog ? (
                                                <div>
                                                    <h1>{blog.title}</h1>
                                                    <div className="blog-content"
                                                        dangerouslySetInnerHTML={{ __html: blog.content }} />
                                                </div>
                                            ) : (
                                                <p>Blog not found</p>
                                            )}



                                        </div>
                                    </div>
                                </div>


                                {/* this is profile */}
                                <div className="col-lg-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <LatestBlogs allblogData={allblogData} />



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>

    );
};

export default BlogDetails;
