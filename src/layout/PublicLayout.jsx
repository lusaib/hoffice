import { Outlet } from "react-router";

/**
 * @author Lusaib Latheef
 * @description The un authenticated layout component that is used to show the layout for the page when the user is not logged in yet.
 */
export default function PublicLayout() {
  return (
    <main className="min-h-screen w-full bg-surface-bg flex flex-col">
      <Outlet />
    </main>
  );
}
