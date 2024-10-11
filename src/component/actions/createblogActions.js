

export const CREATE_NEW_BLOG = 'CREATE_NEW_BLOG';

export const CREATEE_NEW_BLOG_SUCCESS = 'CREATEE_NEW_BLOG_SUCCESS';
export const CREATEE_NEW_BLOGT_FAILURE = 'CREATEE_NEW_BLOGT_FAILURE';


export const FETCH_ALL_BLOGS = 'FETCH_ALL_BLOGS';
export const FETCH_ALL_BLOGS_SUCCESS = 'FETCH_ALL_BLOGS_SUCCESS';
export const FETCH_ALL_BLOGS_FAILURE = 'FETCH_ALL_BLOGS_FAILURE';


export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

export const createNewBlog = blogData => ({
  type: CREATE_NEW_BLOG,
  payload: blogData
});


export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});




export const fetchAllblogs = () => ({
    type: FETCH_ALL_BLOGS
  });