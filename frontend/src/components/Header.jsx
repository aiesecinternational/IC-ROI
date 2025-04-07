import React from 'react';
import logo from '../assets/Frame 368.png';

const Header = () => {
  return (
    <header className="relative size-32 ...">
      <div className='absolute top-0 left-0'>
        <img 
        src={logo} 
        alt="AIESEC INTERNATIONAL CONFERENCE Logo" 
        className="!h-2 !mr-2.5 !w-auto" 
        />
      </div>
    </header>
  );
};

export default Header;

