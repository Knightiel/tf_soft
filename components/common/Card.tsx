
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-gray-800 shadow-lg rounded-xl overflow-hidden ${className}`}>
      {title && (
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-bold text-gray-100">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
