import React, { useState } from 'react';

const AdminPendingPurchases = () => {
  const [purchases, setPurchases] = useState(
    JSON.parse(localStorage.getItem('pendingPurchases')) || []
  );

  const approvePurchase = (purchaseId) => {
    const allPurchases = [...purchases];
    const purchaseIndex = allPurchases.findIndex(p => p.id === purchaseId);
    
    if (purchaseIndex !== -1) {
      const purchase = allPurchases[purchaseIndex];
      
      // Update user points
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = users.map(user => {
        if (user.id === purchase.userId) {
          return {
            ...user,
            points: (user.points || 0) + purchase.points,
            transactions: [
              ...(user.transactions || []),
              {
                type: 'purchase',
                productId: purchase.productId,
                productName: purchase.productName,
                points: purchase.points,
                date: new Date().toISOString()
              }
            ]
          };
        }
        return user;
      });

      // Add to transactions
      const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
      transactions.push({
        ...purchase,
        status: 'approved',
        approvedDate: new Date().toISOString()
      });

      // Update state and storage
      allPurchases.splice(purchaseIndex, 1);
      
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('transactions', JSON.stringify(transactions));
      localStorage.setItem('pendingPurchases', JSON.stringify(allPurchases));
      setPurchases(allPurchases);
    }
  };

  const rejectPurchase = (purchaseId) => {
    const updatedPurchases = purchases.filter(p => p.id !== purchaseId);
    localStorage.setItem('pendingPurchases', JSON.stringify(updatedPurchases));
    setPurchases(updatedPurchases);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Solicitudes de Compra Pendientes</h2>
      
      {purchases.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          No hay solicitudes pendientes
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {purchases.map(purchase => (
              <div key={purchase.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">
                      {purchase.username} solicitó {purchase.productName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(purchase.date).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Puntos a otorgar: <span className="font-medium text-green-600">+{purchase.points}</span>
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => approvePurchase(purchase.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => rejectPurchase(purchase.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPendingPurchases;