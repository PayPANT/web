import { useState } from 'react';

const useNavigate = () => {
  const [currentPage, setCurrentPage] = useState('products');

  const navigate = (page) => {
    setCurrentPage(page);
    window.history.pushState({}, '', `/${page}`);
  };

  return { navigate, currentPage };
};

export default useNavigate;