import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage, deleteblog, fetchAllblogs } from '../actions/createblogActions';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import AuthContext from './AuthContext';
import './admin.css'
function AllBlogList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const allblogData = useSelector(state => state.blog.allblogs);
    const loading = useSelector(state => state.blog.loading);
    const deleteSuccess = useSelector(state => state.blog.blogdeletedSuccess);
    const deleteFailure = useSelector(state => state.blog.blogdeletedFailure);
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        dispatch(fetchAllblogs());
    }, [dispatch]);

    const handleEdit = (blog) => {
        navigate(`/edit/${blog._id}`); // Adjust route for editing
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);


    const openNotification = (message, description, type) => {
        const textColor = type === 'success' ? 'black' : 'red';
        const args = {
            message: <span style={{ color: textColor }}>{message}</span>,
            description: <span style={{ color: textColor }}>{description}</span>,
            duration: 2
        };
        notification.open(args);
    };

    useEffect(() => {
        if (deleteSuccess) {
            openNotification("ब्लॉग यशस्वीरित्या हटविला गेला", "अभिनंदन, तुम्ही ब्लॉग यशस्वीरित्या हटविला आहे.", 'success');
            dispatch(fetchAllblogs());

            setTimeout(() => {
                dispatch(clearMessage());
            }, 3000);
        }

        if (deleteFailure) {
            openNotification("ब्लॉग हटविला गेला नाही", "क्षमस्व, काहीतरी चुकले आहे.", 'error');
            dispatch(fetchAllblogs());
            setTimeout(() => {
                dispatch(clearMessage());
            }, 3000);
        }
    }, [deleteSuccess, deleteFailure, dispatch]);


    // const handleDelete = (blog) => {
    //     dispatch(deleteblog(blog._id)); // Uncomment this if delete functionality is implemented
    // };


    const handleDelete = (blog) => {
        // Confirm deletion
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (confirmDelete) {
            dispatch(deleteblog(blog._id)); // Dispatch the delete action
        }
    };
    return (
        <div>
            <h2 className='m-3'>Created Blogs</h2>

            {loading ? (
                <div className="d-flex justify-content-center align-items-center text-primary" style={{ height: '50vh' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <ul className="list-group">
                                {allblogData && allblogData.length > 0 ? (
                                    allblogData.map((blog, index) => {
                                        const parser = new DOMParser();
                                        const doc = parser.parseFromString(blog.content, 'text/html');
                                        const imgElement = doc.querySelector('img');
                                        const blogImg = imgElement ? imgElement.src : '';

                                        return (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center blog-item">
                                                <div className="blog-title">
                                                    {blog.title}
                                                </div>
                                                <div className="action-icons">
                                                    <i className='bx bxs-edit' onClick={() => handleEdit(blog)} style={{ color: '#007bff' }}></i>
                                                    <i className='bx bx-trash' onClick={() => handleDelete(blog)} style={{ color: 'red' }}></i>
                                                </div>
                                                {blogImg && (
                                                    <div className="image-parent">
                                                        <img src={blogImg} className="img-fluid" alt={blog.title} />
                                                    </div>
                                                )}
                                            </li>
                                        );
                                    })
                                ) : (
                                    <p>No blogs available</p>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllBlogList;
