import React from 'react';

const Header = ({ title, subtitle }) => {
  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-light text-gray-800">{title}</h1>
        {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <select className="bg-white border-none rounded-xl px-4 py-2.5 outline-none shadow-sm text-sm font-medium text-gray-600 cursor-pointer">
          <option>Ciclo Escolar 2026-A</option>
          <option>Ciclo Escolar 2025-B</option>
        </select>
        <div className="w-10 h-10 rounded-full bg-[#CDBBA7] shadow-sm cursor-pointer border-2 border-white"></div>
      </div>
    </header>
  );
};

export default Header;
