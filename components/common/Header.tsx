
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { IconLogout } from '../../constants';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800/80 backdrop-blur-md shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">
          <span className="text-indigo-400">Sistema</span>TOC
        </h1>
        <div className="flex items-center">
          <span className="text-gray-300 mr-4">
            Olá, <span className="font-semibold">{user?.name}</span>
          </span>
          <button
            onClick={logout}
            className="flex items-center text-gray-300 hover:text-white transition-colors"
            title="Sair"
          >
            <IconLogout className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
