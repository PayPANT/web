import React, { useState } from 'react';

const AdminTransactionsList = () => {
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem('transactions')) || []
  );
  const [selectedType, setSelectedType] = useState('all');

  const filteredTransactions = transactions.filter(t => 
    selectedType === 'all' || t.type === selectedType
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Historial de Transacciones</h2>
      
      <div className="mb-6 flex items-center space-x-4">
        <span className="text-sm font-medium">Filtrar por:</span>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todos</option>
          <option value="purchase">Compras</option>
          <option value="redemption">Canjes</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredTransactions.map((transaction, index) => (
            <div key={index} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">
                    {transaction.type === 'purchase' ? 'Compra' : 'Canje'} de {transaction.productName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Usuario: {transaction.username}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleString()}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  transaction.type === 'purchase' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {transaction.type === 'purchase' 
                    ? `+${transaction.points} pts` 
                    : `-${transaction.points} pts`}
                </div>
              </div>
              {transaction.type === 'redemption' && (
                <div className="mt-2 bg-yellow-50 p-2 rounded border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <span className="font-medium">Notificación:</span> El usuario {transaction.username} canjeó {transaction.points} puntos por {transaction.productName}. ¡Prepáralo para entregarlo!
                  </p>
                </div>
              )}
            </div>
          ))}
          {filteredTransactions.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No hay transacciones para mostrar
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTransactionsList;