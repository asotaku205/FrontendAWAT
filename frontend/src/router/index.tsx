import { Route, Routes } from "react-router";
import Layout from "../layouts/Layout";
import { AddressParsePage } from "../features/address-parse";
import { BlacklistPage } from "../features/blacklist";
import { BusinessForecastPage } from "../features/business-forecast";
import { DashboardPage } from "../features/dashboard";
import { DeliveryDatePage } from "../features/delivery-date";
import { LoginPage } from "../features/auth";
import { OrderDistributionPage } from "../features/order-distribution";
import {
  AssignmentPage,
  EmployeeDetailPage,
  TelesaleCallDetailPage,
  TelesaleOverviewPage,
  TelesalePage,
} from "../features/telesale";

const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<Layout />}>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/blacklist" element={<BlacklistPage />} />
      <Route path="/telesale" element={<TelesalePage />} />
      <Route path="/telesale/dashboard" element={<TelesaleOverviewPage />} />
      <Route path="/telesale/Employees" element={<EmployeeDetailPage />} />
      <Route path="/telesale/calls/:orderCode" element={<TelesaleCallDetailPage />} />
      <Route path="/telesale/split" element={<AssignmentPage />} />
      <Route path="/telesale/work" element={<AssignmentPage view="work" />} />
      <Route path="/business-forecast" element={<BusinessForecastPage />} />
      <Route path="/address-parse" element={<AddressParsePage />} />
      <Route path="/delivery-date" element={<DeliveryDatePage />} />
      <Route path="/order-distribution" element={<OrderDistributionPage />} />
    </Route>
  </Routes>
);

export default AppRouter;
