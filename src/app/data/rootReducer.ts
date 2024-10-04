import { combineReducers } from "@reduxjs/toolkit";
import { feedApi } from "./services";

// App root reducer
const rootReducer = combineReducers({
  [feedApi.reducerPath]: feedApi.reducer,
});

export default rootReducer;
