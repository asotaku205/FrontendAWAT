import { Route, Routes } from "react-router";
import Layout from "../layouts/Layout";
import AddressParse from "../pages/AddressParse";
import Blacklist from "../pages/Blacklist";
import BusinessForecast from "../pages/BusinessForecast";
import Dashboard from "../pages/Dashboard";
import DeliveryDate from "../pages/DeliveryDate";
import OrderDistribution from "../pages/OrderDistribution";
import Telesale from "../pages/Telesale";

const AppRouter = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/blacklist" element={<Blacklist />} />
      <Route path="/telesale" element={<Telesale />} />
      <Route path="/business-forecast" element={<BusinessForecast />} />
      <Route path="/address-parse" element={<AddressParse />} />
      <Route path="/delivery-date" element={<DeliveryDate />} />
      <Route path="/order-distribution" element={<OrderDistribution />} />
    </Route>
  </Routes>
);

export default AppRouter;
