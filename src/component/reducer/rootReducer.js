import { combineReducers } from "@reduxjs/toolkit";
import createblogreducer from "./createblogreducer";

const rootReducer = combineReducers({
  
  blog: createblogreducer,
  
});

export default rootReducer;