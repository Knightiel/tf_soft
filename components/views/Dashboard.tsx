
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Card from '../common/Card';
import { NavLink } from 'react-router-dom';
import { IconTree, IconCloud } from '../../constants';

const Dashboard = () => {
    const { user } = useAuth();

    const quickLinks = [
        { to: "/reality-tree", icon: <IconTree />, title: "Árvore da Realidade Atual", description: "Analise o estado atual e identifique causas raiz." },
        { to: "/conflict-cloud", icon: <IconCloud />, title: "Nuvem de Conflito", description: "Entenda e resolva dilemas e conflitos." },
        { to: "/prerequisite-tree", icon: <IconTree />, title: "Árvore de Pré-Requisitos", description: "Planeje os passos para alcançar um objetivo." },
    ];

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo(a), {user?.name}!</h2>
            <p className="text-gray-400 mb-8">Utilize as ferramentas de análise para tomar decisões mais assertivas.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickLinks.map(link => (
                    <NavLink to={link.to} key={link.to} className="transform hover:-translate-y-1 transition-transform duration-300">
                        <Card className="h-full hover:bg-gray-700/80 hover:border-indigo-500 border-2 border-transparent transition-colors">
                            <div className="flex items-center space-x-4">
                                <div className="text-indigo-400">
                                    {React.cloneElement(link.icon, { className: "w-10 h-10" })}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{link.title}</h3>
                                    <p className="text-gray-400 text-sm">{link.description}</p>
                                </div>
                            </div>
                        </Card>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
