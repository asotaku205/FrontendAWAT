import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { pathname } = useLocation();
  const isTelesalePage = pathname.startsWith("/telesale");

  const closeMenuAfterNavigation = () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="app-layout flex min-h-screen bg-gray-100">
      <Navbar
        isOpen={isMenuOpen}
        onNavigate={closeMenuAfterNavigation}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          isTelesalePage={isTelesalePage}
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen((open) => !open)}
        />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
