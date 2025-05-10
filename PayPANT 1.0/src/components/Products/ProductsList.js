import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { sampleProducts, pendingPurchases } from '../../mock/users';

const ProductsList = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem('products')) || sampleProducts
  );

  const handleBuyRequest = (product) => {
    const purchases = JSON.parse(localStorage.getItem('pendingPurchases')) || [];
    const newPurchase = {
      id: Date.now(),
      userId: currentUser.id,
      username: currentUser.username,
      productId: product.id,
      productName: product.name,
      points: product.pointsGiven,
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    purchases.push(newPurchase);
    localStorage.setItem('pendingPurchases', JSON.stringify(purchases));
    alert('Solicitud enviada. El admin aprobará tu compra pronto.');
  };

  const handleRedeem = (product) => {
    if (currentUser.points < product.pointsCost) {
      alert('No tienes suficientes puntos');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          points: (u.points || 0) - product.pointsCost,
          transactions: [
            ...(u.transactions || []),
            {
              type: 'redemption',
              productId: product.id,
              productName: product.name,
              points: -product.pointsCost,
              date: new Date().toISOString()
            }
          ]
        };
      }
      return u;
    });

    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push({
      userId: currentUser.id,
      username: currentUser.username,
      type: 'redemption',
      productId: product.id,
      productName: product.name,
      points: product.pointsCost,
      date: new Date().toISOString()
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('currentUser', JSON.stringify({
      ...currentUser,
      points: (currentUser.points || 0) - product.pointsCost
    }));

    alert(`¡Canje exitoso! Disfruta tu ${product.name}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Nuestros Productos</h2>
        {currentUser && (
          <div className="bg-blue-100 px-4 py-2 rounded-full">
            <span className="font-medium">Tus puntos: </span>
            <span className="font-bold text-blue-700">
              {currentUser.points || 0}
            </span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
            onBuy={handleBuyRequest}
            onRedeem={handleRedeem}
            userPoints={currentUser.points || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;