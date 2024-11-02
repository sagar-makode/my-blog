import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { Spinner } from 'react-bootstrap';
import { notification } from 'antd';
import { clearMessage, fetcheditblog, updateBlog } from '../actions/createblogActions';
import AuthContext from './AuthContext';

function EditBlog() {
    const navigate = useNavigate()

    const { blogId } = useParams();  // Get blogId from the route
    const dispatch = useDispatch();
    const blog = useSelector(state => state.blog.getblogbyid);  // Fetch blog details
    const loading = useSelector(state => state.blog.loadingeditblog);
    const blogupdatedSuccess = useSelector(state => state.blog.blogupdatedSuccess);
    const blogupdatedFailure = useSelector(state => state.blog.blogupdatedFailure);

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');

    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);  // Loading state for submit action
    const { isAuthenticated } = useContext(AuthContext);

    const tags = ['सरकारी योजना', 'स्कॉलरशिप', 'मराठी बातम्या', 'ऑनलाइन फॉर्म'];
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        dispatch(fetcheditblog(blogId));  // Fetch blog by ID when component mounts
    }, [dispatch, blogId]);

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setSlug(blog.slug)
            setDescription(blog.description);
            setContent(blog.content);
            setSelectedTags(blog.tag);
        }
    }, [blog]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);  // Set loading state to true

        const updatedBlog = {
            title,
            slug,
            description,
            content,
            tag: selectedTags,
            updatedAt: new Date()
        };

        // Dispatching the update action
        dispatch(updateBlog(blogId, updatedBlog));
    };

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
        if (blogupdatedSuccess) {
            setIsLoading(false);  // Reset loading state
            openNotification("ब्लॉग यशस्वीरित्या अद्यतनित झाला", "अभिनंदन, तुम्ही ब्लॉग यशस्वीरित्या अद्यतनित केला आहे.", 'success');

            navigate('/admin/dashboard'); // Navigate after 5 seconds
            setTimeout(() => {
                dispatch(clearMessage());

            }, 3000);
        }

        if (blogupdatedFailure) {
            setIsLoading(false);  // Reset loading state
            openNotification("ब्लॉग अद्यतनित झाला नाही", "क्षमस्व, काहीतरी चुकले आहे.", 'error');

            setTimeout(() => {
                dispatch(clearMessage());
            }, 3000);
        }
    }, [blogupdatedSuccess, blogupdatedFailure, dispatch]);

    return (
        <div>
            {loading || isLoading ? (  // Show spinner if loading or updating
                <div className="d-flex justify-content-center align-items-center text-primary" style={{ height: '50vh' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div className="container mt-4">
                    <h1 className="mb-4">Edit Blog</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="blogTitle">Blog Title</label>
                            <input
                                type="text"
                                id="blogTitle"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter Blog Title"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="blogSlug">Blog url / slug</label>
                            <input
                                type="text"
                                id="blogSlug"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                placeholder="Enter Blog Url"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="blogDescription">Blog Description</label>
                            <input
                                type="text"
                                id="blogDescription"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter Blog Description"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="category">Category</label>
                            <select
                                className="form-select"
                                value={selectedTags}
                                onChange={(e) => setSelectedTags(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {tags.map((tag, index) => (
                                    <option key={index} value={tag}>
                                        {tag}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="blogContent">Blog Content</label>
                            <JoditEditor
                                value={content}
                                onChange={newContent => setContent(newContent)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Update Blog</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default EditBlog;
