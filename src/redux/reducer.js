import { combineReducers } from "redux";
import loadingSlice from "./ComponentSlices/loadingSlice";
import toggleSlice from "./ComponentSlices/toggleSlice";

const rootReducer = combineReducers({
  loading: loadingSlice,
  toggle: toggleSlice,
});

export default rootReducer;
