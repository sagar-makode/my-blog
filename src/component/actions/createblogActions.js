export const CREATE_NEW_BLOG = 'CREATE_NEW_BLOG';
export const CREATEE_NEW_BLOG_SUCCESS = 'CREATEE_NEW_BLOG_SUCCESS';
export const CREATEE_NEW_BLOGT_FAILURE = 'CREATEE_NEW_BLOGT_FAILURE';

export const FETCH_ALL_BLOGS = 'FETCH_ALL_BLOGS';
export const FETCH_ALL_BLOGS_SUCCESS = 'FETCH_ALL_BLOGS_SUCCESS';
export const FETCH_ALL_BLOGS_FAILURE = 'FETCH_ALL_BLOGS_FAILURE';

export const FETCH_EDIT_BLOG = 'FETCH_EDIT_BLOG';
export const FETCH_EDIT_BLOG_SUCCESS = 'FETCH_EDIT_BLOG_SUCCESS';
export const FETCH_EDIT_BLOG_FAILURE = 'FETCH_EDIT_BLOG_FAILURE';

export const UPDATET_BLOG = 'UPDATET_BLOG';
export const UPDATET_BLOG_SUCCESS = 'UPDATET_BLOG_SUCCESS';
export const UPDATET_BLOG_FAILURE = 'UPDATET_BLOG_FAILURE';

export const DELETE_BLOG = 'DELETE_BLOG_BLOG';
export const DELETE_BLOG_SUCCESS = 'DELETE_BLOG_SUCCESS';
export const DELETE_BLOG_FAILURE = 'DELETE_BLOG_FAILURE';

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

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

export const fetcheditblog = id => ({
  type: FETCH_EDIT_BLOG,
  payload: id
});

export const updateBlog = (id, updatedBlogData) => ({
  type: UPDATET_BLOG,
  payload: { id, updatedBlogData }
});

export const deleteblog = (id) => ({
  type: DELETE_BLOG,
  payload: id
});

export const signinRequest = Data => {
  return {
    type: SIGNIN_REQUEST,
    payload: Data
  };
};
