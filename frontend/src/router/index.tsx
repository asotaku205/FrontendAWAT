import { Route, Routes } from "react-router";
import Layout from "../layouts/Layout";
import AddressParse from "../pages/AddressParse";
import Blacklist from "../pages/Blacklist";
import BusinessForecast from "../pages/BusinessForecast";
import Dashboard from "../pages/Dashboard";
import DeliveryDate from "../pages/DeliveryDate";
import Login from "../pages/Login";
import OrderDistribution from "../pages/OrderDistribution";
import Telesale from "../features/telesale/Telesale";
import ViewEmployeePage from "../features/telesale/viewEmployeePage";
import AssignmentPage from "../features/telesale/AssignmentPage";
import TelesaleOverview from "../features/telesale/TelesaleOverview";
import TelesaleCallDetail from "../features/telesale/TelesaleCallDetail";

const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<Layout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/blacklist" element={<Blacklist />} />
      <Route path="/telesale" element={<Telesale />} />
      <Route path="/telesale/dashboard" element={<TelesaleOverview />} />
      <Route path="/telesale/Employees" element={<ViewEmployeePage />} />
      <Route path="/telesale/calls/:orderCode" element={<TelesaleCallDetail />} />
      <Route path="/telesale/split" element={<AssignmentPage />} />
      <Route path="/telesale/work" element={<AssignmentPage view="work" />} />
      <Route path="/business-forecast" element={<BusinessForecast />} />
      <Route path="/address-parse" element={<AddressParse />} />
      <Route path="/delivery-date" element={<DeliveryDate />} />
      <Route path="/order-distribution" element={<OrderDistribution />} />
    </Route>
  </Routes>
);

export default AppRouter;
