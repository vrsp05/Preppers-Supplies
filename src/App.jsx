import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ContactForm from './ContactForm';
import ProductTable from './ProductTable';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Live Google Sheets API URL
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzNuuoro0FF1OQY3k-cmf5J3inRBKANhaE53ibImioaBuhJ5Z62J1CF4VOU48Y_JH9wCw/exec";

    fetch(SCRIPT_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* --- Section 1: Inicio / Sobre Nosotros --- */}
      <section id="inicio" className="relative min-h-[80vh] flex flex-col justify-center py-24 px-6 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10"></div>
        
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-blue-900 mb-6 tracking-tight">
            Suministros Médicos <span className="text-blue-600 font-light">de Confianza</span>
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            Garantizando que las instituciones de salud en México cuenten con el equipo necesario para salvar vidas.
          </p>
          
          <div className="mt-16 p-10 bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-white relative">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 mb-4 text-center w-full">Sobre Nosotros</h2>
            <p className="text-xl leading-relaxed text-gray-700 font-medium italic">
              "Con una sólida trayectoria en el sector salud, Jason James se ha distinguido por ser un puente confiable entre la innovación médica y las instituciones de salud en México. Mi compromiso personal es asegurar que cada producto entregado cumpla con los más altos estándares de calidad."
            </p>
          </div>
        </div>
      </section>

      {/* --- Section 2: Empresa (Negocio) --- */}
      <section id="negocio" className="min-h-[80vh] flex flex-col justify-center py-24 bg-blue-900 text-white px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Nuestra Empresa</h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-8">
              Somos especialistas en la gestión y distribución estratégica de suministros médicos críticos. 
              Nacimos para resolver los retos de abastecimiento en el mercado mexicano, ofreciendo un catálogo dinámico y logística personalizada.
            </p>
            <div className="space-y-4">
              {['Logística Estratégica', 'Calidad Certificada', 'Atención Personalizada'].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                  <span className="font-semibold tracking-wide uppercase text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-blue-800/50 border border-blue-700 p-8 rounded-3xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 italic text-blue-200">Visión Estratégica</h3>
            <p className="text-blue-50 leading-relaxed">
              Nuestro enfoque no es solo vender productos, sino convertirnos en aliados de los hospitales para optimizar sus recursos y asegurar la disponibilidad inmediata de insumos básicos y especializados.
            </p>
          </div>
        </div>
      </section>

      {/* --- Section 3: Productos (Catálogo) --- */}
      <section id="productos" className="min-h-screen py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-gray-100 pb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Catálogo de Productos</h2>
              <p className="text-blue-600 font-medium mt-2 uppercase tracking-widest text-xs">Inventario actualizado en tiempo real</p>
            </div>
            <p className="text-gray-400 text-sm mt-4 md:mt-0 font-medium italic">Mostrando {products.length} artículos disponibles</p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
              <p className="mt-4 text-gray-500 font-medium tracking-wide">Sincronizando con base de datos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {loading ? (
                <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
                  <p className="mt-4 text-gray-500 font-medium tracking-wide">Sincronizando catálogo...</p>
                </div>) : (<ProductTable data={products} />)
              }
            </div>
          )}
        </div>
      </section>

      {/* --- Section 4: Contacto (Formulario) --- */}
      <section id="contacto" className="min-h-screen py-24 bg-gray-100 px-6 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl border-t-[12px] border-blue-900 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0 opacity-50"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-4 tracking-tight">Realizar un Pedido</h2>
              <p className="text-center text-gray-500 mb-12 max-w-md mx-auto leading-relaxed font-medium">
                Envíenos los detalles de su requerimiento y nos pondremos en contacto con usted en menos de 24 horas.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 text-center bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="font-black text-blue-900 uppercase tracking-[0.3em] text-xs mb-2">Jason James</p>
          <p className="text-gray-400 text-sm font-medium italic">Suministros Médicos Especializados para México</p>
          <div className="h-px w-20 bg-gray-100 mx-auto my-8"></div>
          <p className="text-gray-400 text-xs">&copy; {new Date().getFullYear()} | Insumos de Grado Hospitalario</p>
        </div>
      </footer>
    </div>
  );
}

export default App;