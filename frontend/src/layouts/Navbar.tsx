import { useState, type ReactNode } from "react";
import { NavLink } from "react-router";
import type { LucideIcon } from "lucide-react";
import {
  Ban,
  BriefcaseBusiness,
  CalendarClock,
  ChevronDown,
  Headset,
  LayoutDashboard,
  MapPinHouse,
  Truck,
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
      { title: "Phân phối telesale", path: "/telesale", icon: Headset },
      { title: "Blacklist và Hoàn hàng", path: "/blacklist", icon: Ban },
      { title: "Phân phối đơn hàng", path: "/order-distribution", icon: Truck },
      { title: "Dự đoán ngày giao", path: "/delivery-date", icon: CalendarClock },
    ],
  },
];

type MenuTreeItemProps = {
  item: MenuItem;
  depth?: number;
};

const MenuTreeItem = ({ item, depth = 0 }: MenuTreeItemProps) => {
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
      <NavLink to={item.path} end={item.path === "/"} className={itemClassName}>
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
            <MenuTreeItem key={child.path ?? child.title} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

type NavbarProps = {
  items?: MenuItem[];
  logoSrc?: string;
  brandName?: string;
};

const Navbar = ({
  items = menuItems,
  logoSrc = logo,
  brandName = "Logistic Dashboard",
}: NavbarProps) => (
  <aside className="flex min-h-screen w-60 shrink-0 flex-col border-r border-gray-200 bg-white p-3">
    <NavLink to="/" className="flex items-center gap-3 border-b border-gray-200 px-2 pb-5 pt-2">
      <img src={logoSrc} alt="Denso" className="h-9 w-auto max-w-20 object-contain" />
      <span className="text-sm font-bold text-gray-900">{brandName}</span>
    </NavLink>
    <nav aria-label="Danh mục chính" className="mt-5 flex-1">
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <MenuTreeItem key={item.path ?? item.title} item={item} />
        ))}
      </ul>
    </nav>
    <p className="px-3 py-2 text-xs text-gray-400">AWAT Logistics</p>
  </aside>
);

export default Navbar;
