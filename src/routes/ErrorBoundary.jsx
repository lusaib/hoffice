import { useRouteError } from "react-router";
import { PageNotFound } from "../components";

/**
 * @author Lusaib Latheef
 * @description The error boundaries to show an error when happense in the client component.
 */

function ErrorBoundary() {
  const error = useRouteError();

  if (error?.status === 404) {
    return <PageNotFound />;
  }

  // Fallback for any other errors
  return (
    <div className="w-full h-screen">
      <h1>Something went wrong!</h1>
      <p>{error?.message || "Unknown error"}</p>
    </div>
  );
}

export default ErrorBoundary;
