
import React, { useState } from 'react';
import D3Tree from '../visualizations/D3Tree';
import { prerequisiteTreeData as initialData } from '../../services/mockData';
import Card from '../common/Card';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';
import Button from '../common/Button';

const PrerequisiteTreeView = () => {
    const { user } = useAuth();
    const [data, setData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(JSON.stringify(data, null, 2));

    const handleSave = () => {
        try {
            const newData = JSON.parse(editText);
            setData(newData);
            setIsEditing(false);
        } catch (error) {
            alert("Erro no formato JSON. Verifique os dados e tente novamente.");
            console.error("JSON Parse Error:", error);
        }
    };
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">Árvore de Pré-Requisitos (PRT)</h2>
                {user?.role === UserRole.ADMIN && (
                    <Button onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? "Cancelar Edição" : "Editar Dados"}
                    </Button>
                )}
            </div>
            <p className="text-gray-400 mb-6">Esta árvore detalha os pré-requisitos e as etapas intermediárias necessárias para alcançar um objetivo. O nó verde representa a injeção/objetivo final.</p>

             {isEditing && (
                <Card title="Editar Dados da Árvore (Formato JSON)" className="mb-6">
                    <textarea 
                        className="w-full h-64 bg-gray-900 text-gray-200 font-mono p-4 rounded-md border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                    <div className="mt-4 flex justify-end space-x-4">
                        <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancelar</Button>
                        <Button onClick={handleSave}>Salvar Alterações</Button>
                    </div>
                </Card>
            )}

            <Card>
                <D3Tree data={data} />
            </Card>
        </div>
    );
};

export default PrerequisiteTreeView;
