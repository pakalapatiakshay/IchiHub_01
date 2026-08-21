import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import ProviderProfile from './pages/ProviderProfile';
import BookService from './pages/BookService';
import About from './pages/About';
import AuthPage from './pages/auth/AuthPage';
import RoleProtectedRoute from './components/layout/RoleProtectedRoute';
import CustomerDashboard from './pages/dashboards/CustomerDashboard';
import VendorDashboard from './pages/dashboards/VendorDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="provider/:id" element={<ProviderProfile />} />
          <Route path="book/:id" element={<BookService />} />
          <Route path="about" element={<About />} />
          
          {/* Auth Routes */}
          <Route path="customer/login" element={<AuthPage role="customer" type="login" />} />
          <Route path="customer/register" element={<AuthPage role="customer" type="register" />} />
          <Route path="vendor/login" element={<AuthPage role="vendor" type="login" />} />
          <Route path="vendor/register" element={<AuthPage role="vendor" type="register" />} />
          <Route path="admin/login" element={<AuthPage role="admin" type="login" />} />

          {/* Protected Dashboards */}
          <Route element={<RoleProtectedRoute allowedRole="customer" />}>
            <Route path="customer/dashboard" element={<CustomerDashboard />} />
          </Route>
          
          <Route element={<RoleProtectedRoute allowedRole="vendor" />}>
            <Route path="vendor/dashboard" element={<VendorDashboard />} />
          </Route>

          <Route element={<RoleProtectedRoute allowedRole="admin" />}>
            <Route path="admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
