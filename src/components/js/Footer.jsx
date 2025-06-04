import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p className="footertext">{currentYear} © Spots</p>
    </footer>
  );
}