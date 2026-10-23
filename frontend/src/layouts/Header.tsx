import { useEffect, useState } from "react";
import { Menu, UserRound, X } from "lucide-react";

type HeaderProps = {
  userName?: string;
  role?: string;
  isTelesalePage?: boolean;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
};

const formatCurrentTime = () =>
  new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "full",
    timeStyle: "medium",
  }).format(new Date());

const Header = ({
  userName = "Người dùng",
  role = "Tài khoản",
  isTelesalePage = false,
  isMenuOpen,
  onMenuToggle,
}: HeaderProps) => {
  const [currentTime, setCurrentTime] = useState(formatCurrentTime);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(formatCurrentTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="app-header flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-5 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={onMenuToggle}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700/40"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" size={20} />
          ) : (
            <Menu aria-hidden="true" size={20} />
          )}
        </button>
        {isTelesalePage ? (
          <input
            aria-label="Tìm mã đơn, SĐT, khách hàng"
            placeholder="Tìm mã đơn, SĐT, khách hàng..."
            className="h-8 w-72 rounded-sm border border-gray-300 bg-transparent px-2 text-xs outline-none focus:border-red-500"
          />
        ) : (
          <time className="truncate text-sm capitalize text-gray-600">{currentTime}</time>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-red-50 text-red-800">
          <UserRound aria-hidden="true" size={18} />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-gray-900">{userName}</p>
          <p className="mt-1 text-xs text-gray-500">{role}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
