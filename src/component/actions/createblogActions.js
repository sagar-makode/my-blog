

export const CREATE_NEW_BLOG = 'CREATE_NEW_BLOG';

export const FETCH_ALL_BLOGS = 'FETCH_ALL_BLOGS';
export const FETCH_ALL_BLOGS_SUCCESS = 'FETCH_ALL_BLOGS_SUCCESS';
export const FETCH_ALL_BLOGS_FAILURE = 'FETCH_ALL_BLOGS_FAILURE';

export const createNewBlog = blogData => ({
  type: CREATE_NEW_BLOG,
  payload: blogData
});






export const fetchAllblogs = () => ({
    type: FETCH_ALL_BLOGS
  });