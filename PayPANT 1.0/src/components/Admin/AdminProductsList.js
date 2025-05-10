import React, { useState } from 'react';

const AdminProductsList = () => {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem('products')) || []
  );
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    price: 0,
    pointsGiven: 0,
    pointsCost: 0,
    stock: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [name]: name.endsWith('price') || name.endsWith('Given') || name.endsWith('Cost') || name.endsWith('stock') 
          ? Number(value) 
          : value
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: name.endsWith('price') || name.endsWith('Given') || name.endsWith('Cost') || name.endsWith('stock') 
          ? Number(value) 
          : value
      });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editingProduct) {
          setEditingProduct({
            ...editingProduct,
            image: reader.result
          });
        } else {
          setNewProduct({
            ...newProduct,
            image: reader.result
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProduct = (e) => {
    e.preventDefault();
    let updatedProducts = [...products];
    
    if (editingProduct) {
      updatedProducts = updatedProducts.map(p => 
        p.id === editingProduct.id ? editingProduct : p
      );
      setEditingProduct(null);
    } else {
      const productToAdd = {
        ...newProduct,
        id: Date.now()
      };
      updatedProducts.push(productToAdd);
      setNewProduct({
        name: '',
        image: '',
        price: 0,
        pointsGiven: 0,
        pointsCost: 0,
        stock: 0
      });
    }

    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Administrar Productos</h2>
      
      <form onSubmit={saveProduct} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={editingProduct ? editingProduct.name : newProduct.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Precio ($)</label>
            <input
              type="number"
              name="price"
              value={editingProduct ? editingProduct.price : newProduct.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Puntos a Otorgar</label>
            <input
              type="number"
              name="pointsGiven"
              value={editingProduct ? editingProduct.pointsGiven : newProduct.pointsGiven}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Puntos para Canjear</label>
            <input
              type="number"
              name="pointsCost"
              value={editingProduct ? editingProduct.pointsCost : newProduct.pointsCost}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={editingProduct ? editingProduct.stock : newProduct.stock}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              required
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          {editingProduct && (
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition duration-200"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            {editingProduct ? 'Actualizar' : 'Agregar'}
          </button>
        </div>
      </form>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puntos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.image && (
                    <img src={product.image} alt={product.name} className="h-10 w-10 rounded-full object-cover" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">+{product.pointsGiven}</span>
                    <span>/</span>
                    <span className="text-blue-600">{product.pointsCost}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductsList;