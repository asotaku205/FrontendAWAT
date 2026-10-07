import { NavLink } from "react-router";
import logo from "../assets/Denso_logo.svg";
import { Ban, BriefcaseBusiness, CalendarClock, Headset, LayoutDashboard, MapPinHouse, Truck } from "lucide-react";

const Navbar = () => {
  return (
    <aside className=" flex flex-col bg-white  p-2 w-56 min-h-screen text-xs">
      <div className="font-bold text-lg border-b border-gray-700 p-2">
        <NavLink to="/" className="w-4 h-4 object-cover mb-4">
          <img src={logo} alt="Logo" />
        </NavLink>
        <NavLink to="/" className="mt-4">

          Logistic Dashboard
        </NavLink>
      </div>
      <nav className="flex flex-col flex-1 gap-4 mt-8  ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `items-center hover:bg-red-800 hover:text-white p-2 rounded flex gap-4 ${isActive ? "bg-red-700 text-white font-bold" : ""}`
          }
        >
          
        <LayoutDashboard />
          Dashboard
        </NavLink>
        <NavLink
          to="/business-forecast"
          className={({ isActive }) =>
            `items-center hover:bg-red-800 hover:text-white p-2 rounded flex gap-4 ${isActive ? "bg-red-700 text-white font-bold" : ""}`
          }
        >
          <BriefcaseBusiness />
          Dự đoán kinh doanh
        </NavLink>
        <NavLink
          to="/address-parse"
          className={({ isActive }) =>
            `items-center hover:bg-red-800 hover:text-white p-2 rounded flex gap-4 ${isActive ? "bg-red-700 text-white font-bold" : ""}`
          }
        >
          <MapPinHouse />
          Phân tách địa chỉ
        </NavLink>
        <NavLink
          to="/telesale"
          className={({ isActive }) =>
            `items-center hover:bg-red-800 hover:text-white p-2 rounded flex gap-4 ${isActive ? "bg-red-700 text-white font-bold" : ""}`
          }
        >
          <Headset />
          Phân phối telesale
        </NavLink>
        <NavLink
          to="/blacklist"
          className={({ isActive }) =>
            `items-center hover:bg-red-800 hover:text-white p-2 rounded flex gap-4 ${isActive ? "bg-red-700 text-white font-bold" : ""}`
          }
        >
          <Ban />
          Blacklist và Hoàn hàng
        </NavLink>
        <NavLink
          to="/order-distribution"
          className={({ isActive }) =>
            `items-center hover:bg-red-800 hover:text-white p-2 rounded flex gap-4 ${isActive ? "bg-red-700 text-white font-bold" : ""}`
          }
        >
          <Truck />
          Phân phối đơn hàng
        </NavLink>
        <NavLink
          to="/delivery-date"
          className={({ isActive }) =>
            `items-center hover:bg-red-800 hover:text-white p-2 rounded flex gap-4 ${isActive ? "bg-red-700 text-white font-bold" : ""}`
          }
        >
          <CalendarClock />
          Dự đoán ngày giao
        </NavLink>
      </nav>

      <div className="mt-auto p-2">rút gọn</div>
    </aside>
  );
};

export default Navbar;
