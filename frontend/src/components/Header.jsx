import React from 'react';
import HeaderBeach from '../assets/Header_beach.png';
import Logo from '../assets/Logo.png';

const Header = () => {
  return (
    <div className="relative w-screen h-auto -mt-2 -ml-[24px] -mr-[28px]">
      {/* Background Image */}
      <div className="w-full h-full">
        <img 
          src={HeaderBeach} 
          alt="Beach Wave Background" 
          className="w-full h-auto object-cover object-top" 
        />
      </div>
      
      {/* Content Overlay */}
      <div className="absolute top-0 ml-0">
        <div className="flex items-start">
          {/* Logo */}
          <img 
            src={Logo} 
            alt="AIESEC IC 2025 Logo" 
            className="w-[360px] h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

