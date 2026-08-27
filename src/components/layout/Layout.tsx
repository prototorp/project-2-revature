import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <footer className="border-top py-3 mt-auto text-center text-body-secondary">
        <small>MovieDB group project</small>
      </footer>
    </>
  );
}

export default Layout;