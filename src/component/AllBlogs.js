import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllblogs } from './actions/createblogActions';

function AllBlogs() {

    const allblogData = useSelector(state => state.createblog.allblogs);
    
const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllblogs());
    }, [dispatch]);

  return (
    <div>
    <h1>All Blogs</h1>

    {allblogData && allblogData.length > 0 ? (
        // Map through the blogs and display them
        allblogData.map(blog => (
            <div key={blog._id} style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
                <h3>{blog.title}</h3>
                {/* Use dangerouslySetInnerHTML to display content as HTML */}
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                <p>Created at: {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
        ))
    ) : (
        <p>No blogs available</p>
    )}
</div>
  )
}

export default AllBlogs