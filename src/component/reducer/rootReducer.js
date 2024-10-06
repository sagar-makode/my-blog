import { combineReducers } from "@reduxjs/toolkit";
import createblogreducer from "./createblogreducer";

const rootReducer = combineReducers({
  createblog: createblogreducer,
  
});

export default rootReducer;