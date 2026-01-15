"use client";

import React, { useEffect } from 'react';

const PromoBar: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector('.promo-bar')?.classList.add('animated');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="promo-bar">
      <div className="promo-desktop">
        <span>Concept demo • Conținut orientativ • Dezvoltat de sky.ro • <a href="mailto:dan.trifan@sky.ro">dan.trifan@sky.ro</a> • <a href="https://wa.me/40720088880">+4 0720 088 880</a></span>
        <a className="btn btn-promo" href="https://wa.me/40720088880">WhatsApp</a>
      </div>
      <div className="promo-mobile">
        <div className="promo-left">Concept demo</div>
        <div className="promo-right">Dezvoltat de sky.ro <a href="https://wa.me/40720088880">+4 0720 088 880</a></div>
      </div>
    </div>
  );
};

export default PromoBar;