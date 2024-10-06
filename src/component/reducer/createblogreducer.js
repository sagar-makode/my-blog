// userReducer.js

import { FETCH_ALL_BLOGS, FETCH_ALL_BLOGS_FAILURE, FETCH_ALL_BLOGS_SUCCESS } from "../actions/createblogActions";

const initialState = {
    allblogs:[],
    error : '',
    loadingforhome : false
  };
  
  const createblogreducer = (state = initialState, action) => { 
    switch (action.type) {
        case FETCH_ALL_BLOGS:
            return {
              ...state,
              loadingforhome :true,
            }
          case FETCH_ALL_BLOGS_SUCCESS:
            return {
              ...state,
              allblogs :action.payload,
              loadingforhome : false
            }
            case FETCH_ALL_BLOGS_FAILURE:
              return {
                ...state,
                error :action.payload,
                loadingforhome : false
              }
      
          
      default:
        return state;
    }
  };
  
  export default createblogreducer;
  