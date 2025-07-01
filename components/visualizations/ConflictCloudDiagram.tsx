
import React from 'react';
import { ConflictCloudData } from '../../types';

interface ConflictCloudDiagramProps {
  data: ConflictCloudData;
}

const CloudBox: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`bg-gray-700 border-2 border-gray-600 rounded-lg p-4 shadow-lg text-center flex items-center justify-center min-h-[80px] ${className}`}>
        {children}
    </div>
);

const Arrow: React.FC<{ from: string, to: string, label?: string, conflict?: boolean }> = ({ from, to, label, conflict = false }) => {
    const color = conflict ? "stroke-red-500" : "stroke-gray-500";
    const markerId = conflict ? "arrowhead-conflict" : "arrowhead";
    return (
        <g>
            <marker id={markerId} viewBox="0 -5 10 10" refX="5" refY="0" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,-5L10,0L0,5" className={conflict ? "fill-red-500" : "fill-gray-500"}></path>
            </marker>
            <line x1={from} y1="50%" x2={to} y2="50%" className={`${color} stroke-2`} markerEnd={`url(#${markerId})`}></line>
            {label && <text x={`calc((${from} + ${to}) / 2)`} y="50%" dy="-8" textAnchor="middle" className="fill-gray-400 text-sm">{label}</text>}
        </g>
    );
};

const ConflictArrow: React.FC<{ from: string, to: string }> = ({ from, to }) => (
    <g>
        <line x1={from} y1="50%" x2={to} y2="50%" className="stroke-red-500 stroke-2" />
        <text x={`calc((${from} + ${to}) / 2)`} y="50%" dy="-5" dx="-10" fontSize="24" className="fill-red-500">⚡</text>
    </g>
);


const ConflictCloudDiagram: React.FC<ConflictCloudDiagramProps> = ({ data }) => {
  return (
    <div className="p-8 bg-gray-800 rounded-xl">
        <div className="grid grid-cols-5 grid-rows-2 gap-x-8 gap-y-12 items-center relative">
            <div className="col-start-1 row-start-1"><CloudBox>{data.prerequisites.d}</CloudBox></div>
            <div className="col-start-2 row-start-1"><CloudBox>{data.requirements.b}</CloudBox></div>
            <div className="col-start-4 row-start-1"><CloudBox>{data.objective}</CloudBox></div>

            <div className="col-start-1 row-start-2"><CloudBox>{data.prerequisites.dPrime}</CloudBox></div>
            <div className="col-start-2 row-start-2"><CloudBox>{data.requirements.c}</CloudBox></div>

            <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }}>
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b7280" />
                    </marker>
                    <marker id="conflict-arrow" viewBox="0 0 14 14" refX="7" refY="7" markerWidth="10" markerHeight="10" orient="auto">
                         <path d="M2,2 L12,12 M12,2 L2,12" stroke="#ef4444" strokeWidth="2" />
                    </marker>
                </defs>

                {/* Arrows from D->B, D'->C */}
                <line x1="9%" y1="25%" x2="29%" y2="25%" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="9%" y1="75%" x2="29%" y2="75%" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* Arrows from B->A, C->A */}
                <line x1="31%" y1="25%" x2="69%" y2="25%" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="31%" y1="75%" x2="69%" y2="75%" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
                
                {/* Conflict line */}
                <line x1="9%" y1="25%" x2="9%" y2="75%" stroke="#ef4444" strokeWidth="3" />
                <line x1="8%" y1="50%" x2="10%" y2="50%" stroke="#ef4444" strokeWidth="3" transform="translate(-15, 0) rotate(45 9% 50%)" />
                <line x1="8%" y1="50%" x2="10%" y2="50%" stroke="#ef4444" strokeWidth="3" transform="translate(-15, 0) rotate(-45 9% 50%)" />
                <line x1="8%" y1="50%" x2="10%" y2="50%" stroke="#ef4444" strokeWidth="3" transform="translate(15, 0) rotate(45 9% 50%)" />
                <line x1="8%" y1="50%" x2="10%" y2="50%" stroke="#ef4444" strokeWidth="3" transform="translate(15, 0) rotate(-45 9% 50%)" />
            </svg>
        </div>
    </div>
  );
};

export default ConflictCloudDiagram;
