import React from 'react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand Name */}
        <div className="text-xl font-bold text-blue-900 tracking-tight">
          MED<span className="text-blue-600">MEX</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <a href="#inicio" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Inicio</a>
          <a href="#productos" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Productos</a>
          <a href="#contacto" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Contacto</a>
        </div>

        {/* Mobile Call to Action */}
        <a 
          href="#contacto" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all"
        >
          Cotizar
        </a>
      </div>
    </nav>
  );
};

export default Navbar;