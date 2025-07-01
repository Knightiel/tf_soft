
import React, { useState } from 'react';
import { systemModules } from '../../services/mockData';
import { SystemModule } from '../../types';
import Card from '../common/Card';

const ToggleSwitch = ({ checked, onChange }: { checked: boolean, onChange: (checked: boolean) => void }) => {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
    );
};

const ModuleManagementView = () => {
    const [modules, setModules] = useState<SystemModule[]>(systemModules);

    const handleToggle = (moduleId: string) => {
        setModules(prevModules =>
            prevModules.map(module =>
                module.id === moduleId ? { ...module, isActive: !module.isActive } : module
            )
        );
    };
    
    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-6">Gerenciamento de Módulos</h2>
            <div className="space-y-4">
                {modules.map(module => (
                    <Card key={module.id} className="!p-0">
                        <div className="p-6 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-white">{module.name}</h3>
                                <p className="text-gray-400 text-sm">{module.description}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                               <span className={`text-sm font-medium ${module.isActive ? 'text-green-400' : 'text-gray-500'}`}>
                                    {module.isActive ? 'Ativo' : 'Inativo'}
                                </span>
                                <ToggleSwitch 
                                    checked={module.isActive} 
                                    onChange={() => handleToggle(module.id)} 
                                />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ModuleManagementView;
