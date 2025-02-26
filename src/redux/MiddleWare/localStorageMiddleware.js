import { localStorageUtil } from "../../utils";

/**
 * @author Lusaib Latheef
 * @description The middleware function to handle the storing of data into localstorage
 */
export const localStorageMiddleware = (store) => (next) => (action) => {
  // Handle storing data to localStorage
  if (["userInfo/setUser", "userInfo/clearUser"].includes(action.type)) {
    const data = action.payload;
    localStorageUtil("userInfo", data);
  }

  // Fetch data from localStorage on app refresh
  if (action.type === "userInfo/fetchData") {
    const { key } = action.payload;
    const data = localStorageUtil(key);
    if (data) {
      // Dispatch an action to update the slice with the fetched data
      store.dispatch({ type: "userInfo/setUser", payload: data });
    }
  }

  if (action.type === "userPermissions/setPermissions") {
    const data = action.payload;
    localStorageUtil("userPermissions", data);
  }

  if (action.type === "folderPath/fetchData") {
    const { key } = action.payload;
    const data = localStorageUtil(key);
    if (data) {
      // Dispatch an action to update the slice with the fetched data
      store.dispatch({ type: "folderPath/setFolderPaths", payload: data });
    }
  }

  // Continue with the next middleware or reducer
  return next(action);
};
