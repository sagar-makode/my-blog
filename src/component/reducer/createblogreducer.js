// userReducer.js

import { CLEAR_MESSAGE, CREATEE_NEW_BLOG_SUCCESS, CREATEE_NEW_BLOGT_FAILURE, DELETE_BLOG_FAILURE, DELETE_BLOG_SUCCESS, FETCH_ALL_BLOGS, FETCH_ALL_BLOGS_FAILURE, FETCH_ALL_BLOGS_SUCCESS, FETCH_EDIT_BLOG, FETCH_EDIT_BLOG_FAILURE, FETCH_EDIT_BLOG_SUCCESS, SIGNIN_FAILURE, SIGNIN_SUCCESS, UPDATET_BLOG_FAILURE, UPDATET_BLOG_SUCCESS } from "../actions/createblogActions";

const initialState = {
  allblogs: [],
  error: '',
  loading: false,
  blogCreatedSuccess:false,
  blogCreatedFailure:false,
  getblogbyid:[],
  loadingeditblog: false,
  blogupdatedSuccess:false,
  blogupdatedFailure:false,
  blogdeletedSuccess:false,
  blogdeletedFailure:false,
  SignINSucess: false,
  SignInFailure: false,
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
            blogCreatedFailure:false,
            blogupdatedSuccess:false,
            blogupdatedFailure:false,
            blogdeletedSuccess:false,
            blogdeletedFailure:false,
            SignINSucess: false,
            SignInFailure: false,
          };



          case FETCH_EDIT_BLOG:
            return {
              ...state,
              loadingeditblog: true,
            }
          case FETCH_EDIT_BLOG_SUCCESS:
            return {
              ...state,
              getblogbyid: action.payload,
              loadingeditblog: false
            }
          case FETCH_EDIT_BLOG_FAILURE:
            return {
              ...state,
              error: action.payload,
              loadingeditblog: false
            }


            case UPDATET_BLOG_SUCCESS:
              return {
                ...state,
                blogupdatedSuccess:true,
              }
            case UPDATET_BLOG_FAILURE:
              return {
                ...state,
                blogupdatedFailure:true
              }

              case DELETE_BLOG_SUCCESS:
                return {
                  ...state,
                  blogdeletedSuccess:true,
                }
              case DELETE_BLOG_FAILURE:
                return {
                  ...state,
                  blogdeletedFailure:true
                }
      

                case SIGNIN_SUCCESS:
                  return {
                    ...state,
            
                    SignINSucess: true,
          
                  };
          
                  case SIGNIN_FAILURE:
                           return {
                    ...state,
                    SignInFailure: true
          
                  };
          


    default:
      return state;
  }
};

export default createblogreducer;
