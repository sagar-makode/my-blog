// userReducer.js

import { CLEAR_MESSAGE, CREATE_NEW_BLOG, CREATEE_NEW_BLOG_SUCCESS, CREATEE_NEW_BLOGT_FAILURE, FETCH_ALL_BLOGS, FETCH_ALL_BLOGS_FAILURE, FETCH_ALL_BLOGS_SUCCESS } from "../actions/createblogActions";

const initialState = {
  allblogs: [],
  error: '',
  loading: false,
  blogCreatedSuccess:false,
  blogCreatedFailure:false

};

const createblogreducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_BLOGS:
      return {
        ...state,
        loading: true,
      }
    case FETCH_ALL_BLOGS_SUCCESS:
      return {
        ...state,
        allblogs: action.payload,
        loading: false
      }
    case FETCH_ALL_BLOGS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }




      case CREATEE_NEW_BLOG_SUCCESS:
        return {
          ...state,
          blogCreatedSuccess:true,
        }
      case CREATEE_NEW_BLOGT_FAILURE:
        return {
          ...state,
          blogCreatedFailure:true
        }


        case CLEAR_MESSAGE:
          return {
            ...state,
            blogCreatedSuccess:false,
            blogCreatedFailure:false
          };



    default:
      return state;
  }
};

export default createblogreducer;
