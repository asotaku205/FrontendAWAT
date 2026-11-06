import { useEffect, useRef, useState } from "react";
import { LogOut, Menu, UserRound } from "lucide-react";

type HeaderProps = {
  userName?: string;
  role?: string;
  isTelesalePage?: boolean;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onLogout: () => void;
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
  onLogout,
}: HeaderProps) => {
  const [currentTime, setCurrentTime] = useState(formatCurrentTime);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(formatCurrentTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isProfileMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !profileMenuRef.current?.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsProfileMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileMenuOpen]);

  return (
    <header className="app-header flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-5 py-3">
      <div className="flex min-w-0 items-center gap-3">
        {!isMenuOpen && (
          <button
            type="button"
            aria-label="Mở menu"
            aria-expanded={false}
            aria-controls="primary-navigation"
            onClick={onMenuToggle}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700/40"
          >
            <Menu aria-hidden="true" size={20} />
          </button>
        )}
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
      <div className="relative" ref={profileMenuRef}>
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={isProfileMenuOpen}
          aria-label="Mở menu hồ sơ"
          onClick={() => setIsProfileMenuOpen((open) => !open)}
          className="flex items-center gap-3 rounded-lg p-1.5 text-left hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700/40"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-red-50 text-red-800">
            <UserRound aria-hidden="true" size={18} />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-gray-900">{userName}</span>
            <span className="mt-1 block text-xs text-gray-500">{role}</span>
          </span>
        </button>
        {isProfileMenuOpen && (
          <div
            role="menu"
            aria-label="Menu hồ sơ"
            className="absolute right-0 top-full z-50 mt-2 min-w-48 rounded-lg border border-gray-200 bg-white p-1.5 shadow-lg"
          >
            <div className="border-b border-gray-100 px-3 py-2">
              <p className="text-sm font-semibold text-gray-900">{userName}</p>
              <p className="mt-1 text-xs text-gray-500">{role}</p>
            </div>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsProfileMenuOpen(false);
                onLogout();
              }}
              className="mt-1 flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-700 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700/40"
            >
              <LogOut aria-hidden="true" size={16} />
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
