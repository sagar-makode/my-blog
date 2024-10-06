import JoditEditor from 'jodit-react';
import React, { useRef, useState } from 'react'
import { createNewBlog } from './actions/createblogActions';
import { useDispatch } from 'react-redux';

function CreateBlog() {
  const editor = useRef(null);  // Create a ref for the editor
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState([]); // State for selected tags

  const tags = ['सरकारी योजना', 'स्कॉलरशिप', 'मराठी बातम्या', 'ऑनलाइन फॉर्म'];


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new blog object
    const newBlog = {
      // id: Date.now(),  // Unique ID for each blog (temporary)
      title: title,
      content: content,
      createdAt: new Date(),
      tag: selectedTags
    };

    dispatch(createNewBlog(newBlog));


    // Reset form fields
    setTitle('');
    setContent('');
    setSelectedTags('')
  };



  return (
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

        <button type="submit" className="btn btn-primary m-3">Submit Blog</button>
      </form>
    </div>
  )
}

export default CreateBlog