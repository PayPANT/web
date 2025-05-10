import { useState } from 'react';

const useNavigate = () => {
  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname.substring(1);
    return path || 'login';
  });

  const navigate = (page) => {
    setCurrentPage(page);
    window.history.pushState({}, '', `/${page}`);
    window.dispatchEvent(new Event('popstate'));
  };

  return { navigate, currentPage };
};

export default useNavigate;