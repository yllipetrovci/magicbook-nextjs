import React from 'react';
// import { useLocation } from 'react-router-dom';

export const ProgressBar: React.FC = () => {
  const location = { pathname: '/' };
  const path = location.pathname;

  if (path === '/' || path === '/success') return null;

  // Map paths to progress percentage
  const getProgress = () => {
    switch (path) {
      case '/hero': return 20;
      case '/adventure': return 40;
      case '/details': return 60;
      case '/generating': return 80;
      case '/preview': return 90;
      case '/pricing': return 95;
      case '/checkout': return 98;
      default: return 0;
    }
  };

  return (
    <div className="w-full fixed top-0 left-0 z-50 h-2 bg-gray-100">
      <div
        className="h-full bg-gradient-to-r from-magic-orange to-magic-purple transition-all duration-500 ease-out"
        style={{ width: `${getProgress()}%` }}
      />
    </div>
  );
};