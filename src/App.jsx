import { RouterProvider } from "react-router";
import router from "./routes/Routes";

/**
 * @file App.jsx
 * @author Lusaib Latheef
 * @since 10/02/2025
 * @description 
 * This file serves as the primary entry point to the application. To maintain a clean and modular codebase, 
 * avoid placing direct logic here. Instead, encapsulate functionality within custom hooks or utility functions 
 * and import them into this file.  

 * **Guidelines for Adding Code to This File:**  
 * 1. **Global Hooks/Functions Only:** Only include hooks or functions that need to have a global effect across 
 *    the entire application.  
 * 2. **Avoid Prop Drilling:** Refrain from using this file for prop drilling. Instead, leverage state management 
 *    libraries (e.g., Context API, Redux, Zustand) or custom hooks to manage and share state efficiently.  
 * 3. **Keep It Minimal:** This file should remain lightweight and focused on initializing the application. 
 *    Any non-essential logic should be moved to appropriate components, hooks, or services.  
 * 4. **Future-Proofing:** When adding new features or logic, ensure they are reusable and decoupled from the 
 *    main entry point. This will make the application easier to maintain and scale.  

 * **Best Practices:** 
 * - Use `App.jsx` primarily for routing, global context providers, or theme configurations.  
 * - Always document any global hooks or functions added here to clarify their purpose and usage.  
 * - Regularly review this file to ensure it adheres to the principles of simplicity and modularity.  

 * By following these guidelines, we can ensure a clean, maintainable, and scalable codebase for future development.  
 * @copyright Netstager Pvt Ltd.
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
