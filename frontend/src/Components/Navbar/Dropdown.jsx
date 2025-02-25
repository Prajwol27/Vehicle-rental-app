import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dropdown.css';
import MenuItems from './MenuItems';

function Dropdown() {
  const [click, setClick] = useState(false);


  return (
    <ul className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}>
      {MenuItems.map((item, index) => (
        <li key={index} onClick={() => setClick(false)}>
          <Link to={item.path} className={item.cName}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Dropdown;
