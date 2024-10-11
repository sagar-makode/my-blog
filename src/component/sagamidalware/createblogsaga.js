// sagas/userSaga.js

import {takeLatest,call, put } from 'redux-saga/effects';
import axios from 'axios';
import { CREATE_NEW_BLOG, CREATEE_NEW_BLOG_SUCCESS, CREATEE_NEW_BLOGT_FAILURE, FETCH_ALL_BLOGS, FETCH_ALL_BLOGS_FAILURE, FETCH_ALL_BLOGS_SUCCESS } from '../actions/createblogActions';






  function* handleCreateNewblog(action) {
    try {
        
      const response = yield call(axios.post, "https://my-blog-api-36vn.onrender.com/createblog", action.payload);
      if (response.status === 200) {
        console.log(response);
        
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







  
function* createblogSaga() {
  yield takeLatest(CREATE_NEW_BLOG, handleCreateNewblog);
  yield takeLatest(FETCH_ALL_BLOGS, fetchAllblogsdatasaga);

}

export default createblogSaga;
