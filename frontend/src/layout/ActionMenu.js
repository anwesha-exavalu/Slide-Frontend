import React, { useState } from 'react';
import './ActionMenu.css';

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Menu icon */}
      <button className="menu-button" onClick={toggleDropdown}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f31c8c7af05e09519eeb02f4cca2437360998df50aedccd48c7d3c3cef9bf46?placeholderIfAbsent=true&apiKey=d51d7313bdca4fcf802b81d20b6296aa"
          alt="Menu Icon"
        />
        {/* Show "Action Menu" on hover when the dropdown is not open */}
        {hover && !open && <span className="action-menu-text">Action Menu</span>}
      </button>

      {/* Dropdown options: show on click */}
      {open && (
        <ul className="dropdown-menu">
          <li>Send to Email</li>
          <li>Send to PAS</li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
