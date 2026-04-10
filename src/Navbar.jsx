import React, { useState, useEffect, useRef } from 'react';

/**
 * Custom Hook: useIntersectionObserver
 * Watches when sections cross the 'threshold' of the viewport.
 */
const useIntersectionObserver = (sectionIds) => {
  const [activeSection, setActiveSection] = useState('inicio');
  const observerRef = useRef(null);

  useEffect(() => {
    // If the observer already exists, don't recreate it.
    if (observerRef.current) observerRef.current.disconnect();

    // The logic to run when a section is intersected.
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
          // When > 40% of the section is visible, make it active.
          setActiveSection(entry.target.id);
        }
      });
    };

    // Configuration for the intersection observer.
    const options = {
      root: null, // Watch the viewport
      threshold: 0.5, // 50% must be visible to trigger
      rootMargin: '-80px 0px -20% 0px' // Adjust for sticky navbar height (80px)
    };

    observerRef.current = new IntersectionObserver(callback, options);

    // Tell the observer to watch each section by ID.
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observerRef.current.observe(element);
    });

    // Cleanup function when component unmounts.
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
};

export default function Navbar() {
  // 1. Define the sections we want to watch.
  const sectionIds = ['inicio', 'negocio', 'productos', 'contacto'];

  // 2. Use the hook to find out which section is active.
  const activeSection = useIntersectionObserver(sectionIds);

  // 3. Define our nav links in an array for easy mapping.
  const navLinks = [
    { label: 'Inicio', id: 'inicio' },
    { label: 'Empresa', id: 'negocio' },
    { label: 'Productos', id: 'productos' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Brand Name */}
          <div className="text-xl font-bold text-blue-900 tracking-tight">
            Jason James <span className="text-blue-600 font-medium">Suministros Médicos</span>
          </div>

          {/* Navigation Items (Links + Button) */}
          <div className="flex items-center space-x-10">
            
            {/* Nav Links mapping */}
            <ul className="hidden md:flex space-x-8 text-sm font-semibold text-blue-950">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a 
                    href={`#${link.id}`} 
                    className={`transition-all duration-300 relative group 
                      ${activeSection === link.id 
                        ? 'text-blue-600' // State 1: Active Color
                        : 'hover:text-blue-600 text-blue-950/80' // State 2: Default Color
                      }`}
                  >
                    {link.label}
                    {/* The underline element (only visible on active section) */}
                    <span className={`absolute -bottom-1.5 left-0 h-0.5 bg-blue-600 transition-all duration-300
                      ${activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'}
                    `}></span>
                  </a>
                </li>
              ))}
            </ul>

            {/* DYNAMIC Button: "Cotizar" changes when on Contacto section */}
            <a 
              href="#contacto" 
              className={`border-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-500 shadow-sm
                ${activeSection === 'contacto'
                  ? 'bg-blue-900 text-white border-blue-900 hover:bg-blue-950' // State A: Active/Contact Page
                  : 'bg-white text-blue-900 border-blue-900 hover:bg-blue-50' // State B: Primary CTA
                }`}
            >
              Cotizar
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}