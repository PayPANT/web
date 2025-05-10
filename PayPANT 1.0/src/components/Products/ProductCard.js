import React from 'react';

const ProductCard = ({ product, onBuy, onRedeem, userPoints }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="h-48 bg-gray-200 overflow-hidden">
        {product.image && (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-700">${product.price}</span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
            +{product.pointsGiven} pts
          </span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600 text-sm">Canjea por:</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
            {product.pointsCost} pts
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onBuy(product)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-200 text-sm"
          >
            Solicitar Compra
          </button>
          <button
            onClick={() => onRedeem(product)}
            disabled={userPoints < product.pointsCost}
            className={`flex-1 py-2 px-4 rounded-lg transition duration-200 text-sm ${
              userPoints >= product.pointsCost 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Canjear
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


// DONE