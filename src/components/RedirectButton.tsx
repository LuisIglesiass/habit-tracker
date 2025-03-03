import React from 'react';
import { useNavigate } from 'react-router-dom';

interface RedirectButtonProps {
    label: string;
    direction: string;
    children?: React.ReactNode;
}

const RedirectButton: React.FC<RedirectButtonProps> = ({ label, direction, children }) => {
    const navigate = useNavigate();
    
    const handleClick = (direction: string) => {
        navigate(direction);
    };

    return <button type="button" onClick={() => handleClick(direction)} className="primary-button">
        {label}
        {children}
    </button>
};

export default RedirectButton;