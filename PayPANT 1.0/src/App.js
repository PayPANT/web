import React, { useState, useEffect } from 'react';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import ProductsList from './components/Products/ProductsList';
import AdminDashboard from './components/Admin/AdminDashboard';
import Navbar from './components/Layout/Navbar';
import { sampleProducts, pendingPurchases } from './mock/users';

const App = () => {
  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname.substring(1);
    return path || 'login';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.substring(1);
      setCurrentPage(path || 'login');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Initialize sample data if not exists
  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(sampleProducts));
  }
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }
  if (!localStorage.getItem('transactions')) {
    localStorage.setItem('transactions', JSON.stringify([]));
  }
  if (!localStorage.getItem('pendingPurchases')) {
    localStorage.setItem('pendingPurchases', JSON.stringify(pendingPurchases));
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginForm />;
      case 'register':
        return <RegisterForm />;
      case 'products':
        return <ProductsList />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <LoginForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;


// DONE