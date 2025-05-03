import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignUp from "./Pages/auth/signup/SignUp";
import SignIn from "./Pages/auth/signin/SignIn";
import Home from "./Pages/home/Home";
// import MyBanks from "./Pages/mybanks/MyBanks";
// import TransactionHistory from "./Pages/transactions/TransactionHistory";
// import PaymentTransfers from "./Pages/payments/PaymentTransfers";
import Sidebar from "./Pages/home/SideBar/Sidebar";
import './index.css';

const LayoutWithSidebar = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "240px", flex: 1, padding: "20px" }}>
        {children}
      </div>
    </div>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const hideSidebarPaths = ["/signin", "/signup"];

  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  return (
    shouldHideSidebar ? (
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    ) : (
      <LayoutWithSidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/my-banks" element={<MyBanks />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/payment-transfers" element={<PaymentTransfers />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </LayoutWithSidebar>
    )
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
