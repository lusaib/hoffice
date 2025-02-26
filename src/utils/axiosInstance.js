import axios from "axios";
import { API_PATHS } from "../constants";
import localStorageUtil from "./localStorageUtil";
import router from "../routes/Routes";

// Create a cache adapter using axios-cache-adapter
// const cacheAdapter = axiosCacheAdapter.setupCache({
//   maxAge: 15 * 60 * 1000, // Cache responses for 15 minutes
//   exclude: {
//     methods: ["delete", "patch", "put", "get"],
//   },
// });

// Create an instance of axios with the cache adapter
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // adapter: cacheAdapter.adapter,
});

// Set up axios-retry with the desired configuration
// axiosRetry(axiosInstance, {
//   retries: 2,
//   retryDelay: () => 1000,
//   retryCondition: (error) => {
//     // Retry only when the error code is not 401
//     return error.response && ![401].includes(+error.response.status);
//   },
// });

//include the access and refresh token in interceptors to request
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorageUtil("token");

  // Check if the access token exists and the api request is not for the login
  if (accessToken && !config.url?.includes(API_PATHS.LOGIN)) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

//Interceptor to handle the token expiration scenario
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.config.url?.includes(API_PATHS.LOGIN)) {
      const accessToken = response.data.data?.token || null;
      localStorageUtil("token", accessToken);
    }

    return response;
  },
  async (error) => {
    // Check if the response status is 401 Unauthorized
    if (error.response?.status === 401) {
      // Construct the navigation URL to pass the code back to the login page
      let loginPath = "/";
      router.navigate(loginPath, { replace: true });
    }
    // else if (error.response?.status === 403)
    //   router.navigate("/error", { replace: true });

    return Promise.reject(error);
  }
);

// Create a cache object to store API responses and their timestamps
const cache = {};
const CACHE_MAX_AGE = 15 * 60 * 1000; // 15 minutes in milliseconds

// Define a function to generate cache keys (could include URL and params)
const generateCacheKey = (config) => {
  const { url, params } = config;
  return `${url}:${JSON.stringify(params)}`;
};

// Function to check if the cached data is still valid (within the max age)
const isCacheValid = (cachedItem) => {
  const currentTime = new Date().getTime();
  return currentTime - cachedItem.timestamp < CACHE_MAX_AGE;
};

// Axios request interceptor for caching
axiosInstance.interceptors.request.use(
  async (config) => {
    // Only cache GET requests and when cache: true is provided
    if (config.method === "get" && config.cache === true) {
      const cacheKey = generateCacheKey(config);

      // Check if the response is cached and still valid
      if (cache[cacheKey] && isCacheValid(cache[cacheKey])) {
        console.log("Returning cached data for:", cacheKey);
        return Promise.reject({
          ...cache[cacheKey].response, // Return the cached response
          __isCached: true,
        }); // Reject to prevent Axios from sending a request
      } else if (cache[cacheKey]) {
        // Cache is expired, so delete the cached data
        console.log("Cache expired for:", cacheKey);
        delete cache[cacheKey];
      }
    }

    // Continue with the request if no cache is found or cache is expired
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios response interceptor for storing responses in the cache
axiosInstance.interceptors.response.use(
  (response) => {
    // Only cache responses for GET requests and when cache: true is provided
    if (response.config.method === "get" && response.config.cache === true) {
      const cacheKey = generateCacheKey(response.config);

      // Store the response and the timestamp in cache for the given key
      cache[cacheKey] = {
        response: {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          config: response.config,
          request: response.request,
        },
        timestamp: new Date().getTime(), // Store the current timestamp
      };

      console.log("Caching response for:", cacheKey);
    }

    return response;
  },
  (error) => {
    // If the request was rejected due to cached data, return the cached response
    if (error.__isCached) {
      return Promise.resolve(error);
    }

    // If it's a normal error, pass it on
    return Promise.reject(error);
  }
);

// Add interceptors for request and response
export default axiosInstance;
