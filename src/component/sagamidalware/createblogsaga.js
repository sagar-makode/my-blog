// sagas/userSaga.js

import {takeLatest,call, put } from 'redux-saga/effects';
import axios from 'axios';
import { CREATE_NEW_BLOG, CREATEE_NEW_BLOG_SUCCESS, CREATEE_NEW_BLOGT_FAILURE, DELETE_BLOG, DELETE_BLOG_FAILURE, DELETE_BLOG_SUCCESS, FETCH_ALL_BLOGS, FETCH_ALL_BLOGS_FAILURE, FETCH_ALL_BLOGS_SUCCESS, FETCH_EDIT_BLOG, FETCH_EDIT_BLOG_SUCCESS, SIGNIN_FAILURE, SIGNIN_REQUEST, SIGNIN_SUCCESS, UPDATET_BLOG, UPDATET_BLOG_FAILURE, UPDATET_BLOG_SUCCESS } from '../actions/createblogActions';






  function* handleCreateNewblog(action) {
    try {
      const token = sessionStorage.getItem('token');

      const response = yield call(axios.post, "https://my-blog-api-36vn.onrender.com/createblog", action.payload,
        {
          headers: {
            Authorization: `Bearer${token}`
          }
        }
      );
      
      if (response.status === 200) {
        
        yield put({ type: CREATEE_NEW_BLOG_SUCCESS});
      }else{
        yield put({ type: CREATEE_NEW_BLOGT_FAILURE});
      }
    } catch (error) {
      yield put({ type: CREATEE_NEW_BLOGT_FAILURE});
    }
  }



  function* fetchAllblogsdatasaga() {
    try {
      
       const response = yield call(axios.get, "https://my-blog-api-36vn.onrender.com/allblog");
   
      const blogData = response.data;
    
  
      // Dispatch success action with user role
      yield put({ type: FETCH_ALL_BLOGS_SUCCESS ,payload: blogData});
    } catch (error) {
      // Dispatch failure action on error
      yield put({ type: FETCH_ALL_BLOGS_FAILURE, payload: { error: error.message } });
    }
  }


  function* fetcheditblogdatasaga(action) {
    try {
      const id  = action.payload; // Extract blogId from the action payload
      const token = sessionStorage.getItem('token');

      const response = yield call(axios.get, `https://my-blog-api-36vn.onrender.com/getblog/${id}`,{
        headers: {
          Authorization: `Bearer${token}`
        }
      });
   
      const blogData = response.data;
      
    
  
      // Dispatch success action with user role
      yield put({ type: FETCH_EDIT_BLOG_SUCCESS ,payload: blogData});
    } catch (error) {
      // Dispatch failure action on error
      yield put({ type: FETCH_ALL_BLOGS_FAILURE, payload: { error: error.message } });
      
    }
  }


  function* updateBlogSaga(action) {
    try {
        const { id, updatedBlogData } = action.payload; // Extract id and updated blog data from action payload
        const token = sessionStorage.getItem('token');

        // Send PUT request to update the blog
        const response = yield call(axios.put, `https://my-blog-api-36vn.onrender.com/updateblog/${id}`, updatedBlogData,
          {
            headers: {
              Authorization: `Bearer${token}`
            }
          }
        );
        // Dispatch success action with the updated blog data
        yield put({ type: UPDATET_BLOG_SUCCESS, payload: response.data });
        
        // Optionally, you might want to fetch the updated list of blogs or redirect the user, etc.
    } catch (error) {
        // Dispatch failure action on error
        yield put({ type: UPDATET_BLOG_FAILURE, payload: { error: error.message } });
    }
}

function* deleteBlogSaga(action) {
  try {
      const id  = action.payload; // Extract id from action payload
      const token = sessionStorage.getItem('token');

      // Send DELETE request to remove the blog
      const response = yield call(axios.delete, `https://my-blog-api-36vn.onrender.com/deleteblog/${id}`,{
        headers: {
          Authorization: `Bearer${token}`
        }
      });
      

      // Dispatch success action with the response data
      yield put({ type: DELETE_BLOG_SUCCESS });

      // Optionally, you might want to fetch the updated list of blogs or redirect the user
  } catch (error) {
      // Dispatch failure action on error
      yield put({ type: DELETE_BLOG_FAILURE });
  }
}




function* handleSigninsaga(action) {
  try {
    const response = yield call(axios.post, "https://my-blog-api-36vn.onrender.com/admin/login",action.payload);
    
    if (response.data.token) {
      yield put({ type: SIGNIN_SUCCESS}); 
      
      sessionStorage.setItem('token', response.data.token);
      // window.location.href = '/dashboard';
      

    }
  } catch (error) {
    yield put({ type: SIGNIN_FAILURE });
    // console.error(error);
  }
}





  
function* createblogSaga() {
  yield takeLatest(CREATE_NEW_BLOG, handleCreateNewblog);
  yield takeLatest(FETCH_ALL_BLOGS, fetchAllblogsdatasaga);
  yield takeLatest(FETCH_EDIT_BLOG, fetcheditblogdatasaga);

  yield takeLatest(UPDATET_BLOG, updateBlogSaga);
  yield takeLatest(DELETE_BLOG, deleteBlogSaga);
  yield takeLatest(SIGNIN_REQUEST, handleSigninsaga);





}

export default createblogSaga;
