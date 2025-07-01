
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';
import { IconDashboard, IconTree, IconCloud, IconUsers, IconCog } from '../../constants';

const navItems = [
    { to: '/', text: 'Dashboard', icon: <IconDashboard />, role: [UserRole.USER, UserRole.ADMIN] },
    { to: '/reality-tree', text: 'Árvore da Realidade Atual', icon: <IconTree />, role: [UserRole.USER, UserRole.ADMIN] },
    { to: '/conflict-cloud', text: 'Nuvem de Conflito', icon: <IconCloud />, role: [UserRole.USER, UserRole.ADMIN] },
    { to: '/prerequisite-tree', text: 'Árvore de Pré-Requisitos', icon: <IconTree />, role: [UserRole.USER, UserRole.ADMIN] },
];

const adminNavItems = [
    { to: '/admin/modules', text: 'Gerenciar Módulos', icon: <IconCog />, role: [UserRole.ADMIN] },
    { to: '/admin/users', text: 'Gerenciar Usuários', icon: <IconUsers />, role: [UserRole.ADMIN] },
];

const Sidebar = () => {
    const { user } = useAuth();
    
    const activeLinkClass = 'bg-gray-700 text-white';
    const inactiveLinkClass = 'text-gray-400 hover:bg-gray-700 hover:text-white';
    
    const renderNavLinks = (items: typeof navItems) => {
        return items.filter(item => user && item.role.includes(user.role)).map(item => (
            <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => 
                    `flex items-center px-4 py-2 my-1 rounded-md text-sm font-medium transition-colors ${isActive ? activeLinkClass : inactiveLinkClass}`
                }
            >
                {React.cloneElement(item.icon, { className: 'w-5 h-5 mr-3' })}
                {item.text}
            </NavLink>
        ));
    }

    return (
        <aside className="w-64 bg-gray-800 flex-shrink-0 p-4">
            <nav className="flex flex-col">
                {renderNavLinks(navItems)}
                
                {user?.role === UserRole.ADMIN && (
                    <>
                        <hr className="my-4 border-gray-600" />
                        <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin</h3>
                        {renderNavLinks(adminNavItems)}
                    </>
                )}
            </nav>
        </aside>
    );
};

export default Sidebar;
