import { useState, type ReactNode } from "react";
import { NavLink } from "react-router";
import type { LucideIcon } from "lucide-react";
import {
  Ban,
  BriefcaseBusiness,
  CalendarClock,
  ChevronDown,
  User,
  LayoutDashboard,
  MapPinHouse,
  PhoneCall,
  Truck,
  Headphones,
  X,
} from "lucide-react";
import logo from "../assets/Denso_logo.svg";
import { Button } from "../components/ui/button";

export type MenuItem = {
  title: string;
  path?: string;
  icon?: LucideIcon;
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  { title: "Dashboard", path: "/", icon: LayoutDashboard },
  {
    title: "Quản lý vận hành",
    children: [
      { title: "Dự đoán kinh doanh", path: "/business-forecast", icon: BriefcaseBusiness },
      { title: "Phân tách địa chỉ", path: "/address-parse", icon: MapPinHouse },
      { title: "Phân phối telesale",
        children: [
          { title: "Tổng quan", path: "/telesale/dashboard", icon: LayoutDashboard },
          { title: "Nhân viên", path: "/telesale", icon: User },
          { title: "Chia đơn", path: "/telesale/split", icon: Headphones },
          { title: "Công việc của tôi", path: "/telesale/work", icon: PhoneCall },
        ],
      },
      { title: "Blacklist và Hoàn hàng", path: "/blacklist", icon: Ban },
      { title: "Phân phối đơn hàng", path: "/order-distribution", icon: Truck },
      { title: "Dự đoán ngày giao", path: "/delivery-date", icon: CalendarClock },
    ],
  },
];

type MenuTreeItemProps = {
  item: MenuItem;
  depth?: number;
  onNavigate: () => void;
};

const MenuTreeItem = ({ item, depth = 0, onNavigate }: MenuTreeItemProps) => {
  const [expanded, setExpanded] = useState(true);
  const Icon = item.icon;
  const hasChildren = Boolean(item.children?.length);
  const itemClassName = ({ isActive }: { isActive: boolean }) =>
    `flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-red-50 hover:text-red-800 ${
      isActive ? "bg-red-700 font-semibold text-white hover:bg-red-800 hover:text-white" : "text-gray-700"
    }`;

  let content: ReactNode;
  if (hasChildren && !item.path) {
    content = (
      <Button
        variant="ghost"
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
        className="h-auto w-full justify-between rounded-md px-3 py-2.5 text-left text-sm font-semibold text-gray-500 hover:bg-gray-50"
      >
        <span>{item.title}</span>
        <ChevronDown
          aria-hidden="true"
          size={16}
          className={`transition-transform ${expanded ? "" : "-rotate-90"}`}
        />
      </Button>
    );
  } else if (item.path) {
    content = (
      <NavLink to={item.path} end className={itemClassName} onClick={onNavigate}>
        {Icon && <Icon aria-hidden="true" size={18} />}
        <span>{item.title}</span>
      </NavLink>
    );
  } else {
    content = <p className="px-3 py-2.5 text-sm font-semibold text-gray-500">{item.title}</p>;
  }

  return (
    <li>
      <div style={{ paddingLeft: `${depth * 12}px` }}>{content}</div>
      {hasChildren && expanded && (
        <ul className="mt-1 flex flex-col gap-1">
          {item.children?.map((child) => (
            <MenuTreeItem
              key={child.path ?? child.title}
              item={child}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

type NavbarProps = {
  items?: MenuItem[];
  logoSrc?: string;  isOpen: boolean;
  onNavigate: () => void;
  onClose: () => void;
};

const Navbar = ({
  items = menuItems,
  logoSrc = logo,
  isOpen,
  onNavigate,
  onClose,
}: NavbarProps) => (
  <aside
    id="primary-navigation"
    className={`${isOpen ? "block md:flex" : "hidden"} fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-gray-200 bg-white p-3 shadow-lg md:static md:min-h-screen md:max-h-none md:w-60 md:shrink-0 md:flex-col md:border-b-0 md:border-r md:shadow-none`}
  >
    <div className="flex items-center justify-between gap-2 border-b border-gray-200 px-2 pb-4 pt-2">
      <NavLink to="/" onClick={onNavigate} className="flex min-w-0 items-center gap-3">
        <img src={logoSrc} alt="Denso" className="h-9 w-auto max-w-20 object-contain" />
      </NavLink>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        aria-label="Đóng menu"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={onClose}
        className="shrink-0"
      >
        <X aria-hidden="true" size={20} />
      </Button>
    </div>
    <nav aria-label="Danh mục chính" className="mt-5 flex-1">
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <MenuTreeItem
            key={item.path ?? item.title}
            item={item}
            onNavigate={onNavigate}
          />
        ))}
      </ul>
    </nav>
    <p className="px-3 py-2 text-xs text-gray-400">AWAT Logistics</p>
  </aside>
);

export default Navbar;
