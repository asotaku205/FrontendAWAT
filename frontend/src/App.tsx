import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Blacklist from "./pages/Blacklist";
import Dashboard from "./pages/Dashboard";
import Telesale from "./pages/Telesale";
import BusinessForecast from "./pages/BusinessForecast";
import AddressParse from "./pages/AddressParse";
import DeliveryDate from "./pages/DeliveryDate";
import OrderDistribution from "./pages/OrderDistribution";

function App() {
return (
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
        
    
)
}

export default App;