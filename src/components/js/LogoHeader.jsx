import React from 'react';
import Logo from '/assets/Logo.svg';

export default function LogoHeader() {
  return (
    <header className="site-logo">
      <img className="logo" src={Logo} alt="Spots Logo" />
    </header>
  );
}
