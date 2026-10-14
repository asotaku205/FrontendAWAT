import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";

type HeaderProps = {
  userName?: string;
  role?: string;
};

const formatCurrentTime = () =>
  new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "full",
    timeStyle: "medium",
  }).format(new Date());

const Header = ({ userName = "Người dùng", role = "Tài khoản" }: HeaderProps) => {
  const [currentTime, setCurrentTime] = useState(formatCurrentTime);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(formatCurrentTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-5 py-3">
      <time className="text-sm capitalize text-gray-600">{currentTime}</time>
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
