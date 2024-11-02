import JoditEditor from 'jodit-react';
import React, { useEffect, useRef, useState } from 'react'
import { clearMessage, createNewBlog } from '../actions/createblogActions';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';
import { Spinner } from 'react-bootstrap';

function CreateBlog() {
  const editor = useRef(null);  // Create a ref for the editor
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

  const [description, setDescription] = useState('');

  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState([]); // State for selected tags
  const [loading, setLoading] = useState(false); // State for selected tags


  const tags = ['सरकारी योजना', 'स्कॉलरशिप', 'मराठी बातम्या', 'ऑनलाइन फॉर्म'];
  const blogCreatedSuccess = useSelector(state => state.blog.blogCreatedSuccess);
  const blogCreatedFailure = useSelector(state => state.blog.blogCreatedFailure);



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
    if (blogCreatedSuccess) {

      // setErrors([]);
      // Reset form fields
      setLoading(false)
      setTitle('');
      setSlug('');
      setContent('');
      setDescription('')
      setSelectedTags('')
      const message = "ब्लॉग यशस्वीरित्या तयार झाला"
      const description = "अभिनंदन, तुम्ही ब्लॉग यशस्वीरित्या तयार केला आहे."
      openNotification(message, description, 'success')

      setTimeout(() => {
        dispatch(clearMessage())
      }, 3000);
    }
    if (blogCreatedFailure) {
      setLoading(false)
      const message = "ब्लॉग तयार झाला नाही"
      const description = "क्षमस्व, काहीतरी चुकले आहे."
      openNotification(message, description, 'error')

      setTimeout(() => {
        dispatch(clearMessage())
      }, 3000);
    }
  }, [blogCreatedSuccess, blogCreatedFailure]);


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    // Create new blog object
    const newBlog = {
      // id: Date.now(),  // Unique ID for each blog (temporary)
      title: title,
      slug:slug,
      content: content,
      createdAt: new Date(),
      tag: selectedTags,
      description :description
    };

    dispatch(createNewBlog(newBlog));

  };



  return (

    <div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center text-primary" style={{ height: '50vh' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="container mt-4">
          <h1 className="mb-4">Create a Blog</h1>
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
              <div className="mb-3">
                <h6><label htmlFor="category" className="form-label">Category</label></h6>
                <select
                  className="form-select custom-select"
                  value={selectedTags}
                  onChange={(e) => setSelectedTags(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {tags.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>


              </div>
            </div>



            <div className="form-group mb-3">
              <label htmlFor="blogContent">Blog Content</label>
              <JoditEditor
                ref={editor}
                value={content}
                onChange={(newContent) => setContent(newContent)}
              //   config={{ readonly: false }} // You can configure the editor here
              />
            </div>

            <button type="submit" className="btn btn-primary mt-3" style={{marginBottom:"20px"}}>Submit Blog</button>
          </form>
        </div>

      )}


    </div>

  )
}

export default CreateBlog