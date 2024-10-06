// sagas/userSaga.js

import {takeLatest,call, put } from 'redux-saga/effects';
import axios from 'axios';
import { CREATE_NEW_BLOG, FETCH_ALL_BLOGS, FETCH_ALL_BLOGS_FAILURE, FETCH_ALL_BLOGS_SUCCESS } from '../actions/createblogActions';






  function* handleCreateNewblog(action) {
    try {
        
      const response = yield call(axios.post, "https://my-blog-api-36vn.onrender.com/createblog", action.payload);
      
      

  
    //   if (response.data.token) {
        // yield put({ type: SIGNIN_SUCCESS}); 
        // sessionStorage.setItem('token', response.data.token);
        // window.location.href = '/dashboard';
        

    //   }
    } catch (error) {
    //   yield put({ type: SIGNIN_FAILURE });
      // console.error(error);
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
