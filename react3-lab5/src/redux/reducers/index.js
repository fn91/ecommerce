import { combineReducers } from "redux";
import productReducer from "./itemsReducer.js";

const rootReducer = combineReducers({
  products: productReducer,
});

export default rootReducer;
