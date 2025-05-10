import React, { useState } from 'react';
import { useNavigate } from '../../hooks/useNavigate';
import AdminUsersList from './AdminUsersList';
import AdminProductsList from './AdminProductsList';
import AdminTransactionsList from './AdminTransactionsList';
import AdminPendingPurchases from './AdminPendingPurchases';

const AdminDashboard = () => {
  const { navigate } = useNavigate();
  const [activeTab, setActiveTab] = useState('purchases');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold text-gray-800">
              <span className="text-blue-600">Pay</span>
              <span className="text-purple-600 font-black">PANT</span>
              <span className="text-sm ml-2">Panel de Admin</span>
            </h1>
            <button
              onClick={() => {
                localStorage.removeItem('currentUser');
                navigate('/login');
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Cerrar Sesión
            </button>
          </div>
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('purchases')}
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'purchases' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              Solicitudes
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'products' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              Productos
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'users' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              Usuarios
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'transactions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              Transacciones
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {activeTab === 'products' && <AdminProductsList />}
        {activeTab === 'users' && <AdminUsersList />}
        {activeTab === 'transactions' && <AdminTransactionsList />}
        {activeTab === 'purchases' && <AdminPendingPurchases />}
      </div>
    </div>
  );
};

export default AdminDashboard;