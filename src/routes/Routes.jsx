import { Outlet, ScrollRestoration, createBrowserRouter } from "react-router";
import ErrorBoundary from "./ErrorBoundary";
import { PublicLayout } from "../layout";
import { ComingSoon } from "../pages";

/**
 * @author Lusaib Latheef
 * @description The path creator for the routing page.
 */
const router = createBrowserRouter([
  {
    errorElement: <ErrorBoundary />,
    element: (
      <>
        <ScrollRestoration />
        <Outlet />
      </>
    ),
    id: "root_layout",
    shouldRevalidate: () => false,
    children: [
      {
        path: "/",
        element: <PublicLayout />,
        id: "public_routes",
        shouldRevalidate: () => false,
        children: [
          {
            path: "/",
            element: <ComingSoon />,
            id: "comming-soon",
          },
        ],
      },
    ],
  },
]);

export default router;
