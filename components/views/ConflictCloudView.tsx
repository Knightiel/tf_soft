
import React, { useState } from 'react';
import ConflictCloudDiagram from '../visualizations/ConflictCloudDiagram';
import { conflictCloudData as initialData } from '../../services/mockData';
import Card from '../common/Card';
import { useAuth } from '../../hooks/useAuth';
import { UserRole, ConflictCloudData } from '../../types';
import Button from '../common/Button';

const ConflictCloudView = () => {
    const { user } = useAuth();
    const [data, setData] = useState<ConflictCloudData>(initialData);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<ConflictCloudData>(initialData);
    
    const handleSave = () => {
        setData(editData);
        setIsEditing(false);
    };

    const handleInputChange = (field: keyof ConflictCloudData, value: string, subfield?: 'b' | 'c' | 'd' | 'dPrime') => {
        setEditData(prev => {
            if (subfield) {
                if(field === 'requirements' || field === 'prerequisites') {
                    return { ...prev, [field]: { ...prev[field], [subfield]: value } };
                }
            }
            return { ...prev, [field]: value };
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">Nuvem de Conflito</h2>
                {user?.role === UserRole.ADMIN && (
                    <Button onClick={() => { setIsEditing(!isEditing); setEditData(data); }}>
                        {isEditing ? "Cancelar Edição" : "Editar Dados"}
                    </Button>
                )}
            </div>
            <p className="text-gray-400 mb-6">A Nuvem de Conflito expõe um dilema fundamental, mostrando como pré-requisitos conflitantes impedem o alcance de um objetivo comum.</p>

            {isEditing ? (
                 <Card title="Editar Nuvem de Conflito" className="mb-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Objetivo (A)</label>
                            <input type="text" value={editData.objective} onChange={e => handleInputChange('objective', e.target.value)} className="mt-1 w-full bg-gray-700 border-gray-600 rounded p-2 text-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-300">Requisito (B)</label>
                                <input type="text" value={editData.requirements.b} onChange={e => handleInputChange('requirements', e.target.value, 'b')} className="mt-1 w-full bg-gray-700 border-gray-600 rounded p-2 text-white" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-300">Requisito (C)</label>
                                <input type="text" value={editData.requirements.c} onChange={e => handleInputChange('requirements', e.target.value, 'c')} className="mt-1 w-full bg-gray-700 border-gray-600 rounded p-2 text-white" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-300">Pré-requisito (D)</label>
                                <input type="text" value={editData.prerequisites.d} onChange={e => handleInputChange('prerequisites', e.target.value, 'd')} className="mt-1 w-full bg-gray-700 border-gray-600 rounded p-2 text-white" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-300">Pré-requisito Conflitante (D')</label>
                                <input type="text" value={editData.prerequisites.dPrime} onChange={e => handleInputChange('prerequisites', e.target.value, 'dPrime')} className="mt-1 w-full bg-gray-700 border-gray-600 rounded p-2 text-white" />
                            </div>
                        </div>
                         <div className="mt-4 flex justify-end space-x-4">
                            <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancelar</Button>
                            <Button onClick={handleSave}>Salvar Alterações</Button>
                        </div>
                    </div>
                 </Card>
            ) : (
                <Card>
                    <ConflictCloudDiagram data={data} />
                </Card>
            )}
        </div>
    );
};

export default ConflictCloudView;
