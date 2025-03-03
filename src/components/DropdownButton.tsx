import React, { useState, useRef, useEffect } from 'react';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown-button" onClick={toggleDropdown}>
        <span className="arrow"></span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li>Daily</li>
          <li>Weekly</li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;