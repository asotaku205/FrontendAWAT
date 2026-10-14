import { Outlet } from "react-router";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout = () => (
  <div className="flex min-h-screen bg-gray-100">
    <Navbar />
    <div className="flex min-w-0 flex-1 flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  </div>
);

export default Layout;
