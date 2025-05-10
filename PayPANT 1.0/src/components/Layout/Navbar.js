import React from 'react';
import useNavigate from '../../hooks/useNavigate';

const Navbar = () => {
  const { navigate } = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <button 
          onClick={() => navigate('products')}
          className="text-xl font-bold text-blue-600"
        >
          <span className="text-blue-600">Pay</span>
          <span className="text-purple-600 font-black">PANT</span>
        </button>
        
        {currentUser ? (
          <div className="flex items-center space-x-4">
            {currentUser.role === 'admin' && (
              <button
                onClick={() => navigate('admin')}
                className="text-blue-600 hover:text-blue-800"
              >
                Admin
              </button>
            )}
            <div className="flex items-center">
              {currentUser.profilePic ? (
                <img 
                  src={currentUser.profilePic} 
                  alt={currentUser.fullName}
                  className="h-8 w-8 rounded-full object-cover mr-2"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                  <span className="text-gray-500 text-sm">
                    {currentUser.fullName.charAt(0)}
                  </span>
                </div>
              )}
              <span className="font-medium">{currentUser.fullName}</span>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('currentUser');
                navigate('login');
              }}
              className="text-red-600 hover:text-red-800"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('login')}
              className="text-blue-600 hover:text-blue-800"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => navigate('register')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg"
            >
              Registrarse
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


// DONE