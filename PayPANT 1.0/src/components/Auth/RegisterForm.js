import React, { useState } from 'react';
import useNavigate from '../../hooks/useNavigate';

const RegisterForm = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');
  const { navigate } = useNavigate();

  const ADMIN_SECRET = 'UHlBMjEvMDkvMjI='; // Base64 para PyA21/09/22

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.some(u => u.username === username)) {
      setError('El nombre de usuario ya existe');
      return;
    }

    const isAdmin = password === atob(ADMIN_SECRET);
    if (isAdmin && users.some(u => u.role === 'admin')) {
      setError('Ya existe un administrador registrado');
      return;
    }

    const newUser = {
      id: Date.now(),
      fullName,
      username,
      password,
      profilePic: profilePic ? URL.createObjectURL(profilePic) : null,
      role: isAdmin ? 'admin' : 'user',
      points: 0,
      transactions: []
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    navigate(isAdmin ? 'admin' : 'products');
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="fullName">
            Nombre completo
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
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
        <div className="mb-4">
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
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" htmlFor="profilePic">
            Foto de perfil (opcional)
          </label>
          <input
            id="profilePic"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Registrarse
        </button>
      </form>
      <p className="mt-4 text-center">
        ¿Ya tienes cuenta?{' '}
        <button 
          onClick={() => navigate('login')}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Inicia sesión aquí
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;