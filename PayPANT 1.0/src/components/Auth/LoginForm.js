import React, { useState } from 'react';
import useNavigate from '../../hooks/useNavigate';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { navigate } = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate(user.role === 'admin' ? 'admin' : 'products');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="username">
            Nombre de usuario
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Iniciar Sesión
        </button>
      </form>
      <p className="mt-4 text-center">
        ¿No tienes cuenta?{' '}
        <button 
          onClick={() => navigate('register')}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Regístrate aquí
        </button>
      </p>
    </div>
  );
};

export default LoginForm;