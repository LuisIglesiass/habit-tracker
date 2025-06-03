import React from 'react';

interface ButtonProps {
    label: string;
    type: 'button' | 'submit';
    onClick?: () => void;
    className?: string;
  }
  
  const Button: React.FC<ButtonProps> = ({ label, type, onClick, className }) => {
     return <button type={type} className={className} onClick={onClick}>
      {label}
     </button>
  };
  
  export default Button;