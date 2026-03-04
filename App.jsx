import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ContactForm from './components/ContactForm';

// Mock data for initial development
const MOCK_PRODUCTS = [
  { id: 1, name: "Guantes de Nitrilo", category: "Protección", stock: "Disponible" },
  { id: 2, name: "Mascarillas KN95", category: "Respiratorio", stock: "Agotado" },
  { id: 3, name: "Termómetro Digital", category: "Diagnóstico", stock: "Disponible" },
];

function App() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Navbar />

      {/* --- Section 1: Home / About Him --- */}
      <section id="inicio" className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Suministros Médicos</h1>
        <p className="text-xl text-gray-600 italic">"Dedicado a proveer calidad y confianza a los hospitales de México."</p>
        <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-3 border-b pb-2">Sobre Nosotros</h2>
          <p className="leading-relaxed">
            [Breve descripción sobre el fundador y su trayectoria en el sector médico.]
          </p>
        </div>
      </section>

      {/* --- Section 2: Business / Value Prop --- */}
      <section id="negocio" className="py-16 bg-blue-900 text-white px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Nuestra Empresa</h2>
            <p className="text-blue-100">
              Nos especializamos en la distribución estratégica de insumos médicos de alta demanda, 
              asegurando que los hospitales cuenten con las herramientas necesarias para salvar vidas.
            </p>
          </div>
          <div className="bg-blue-800 p-6 rounded-xl">
            <h3 className="font-bold mb-2">Por qué elegirnos:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Logística directa a hospitales en México.</li>
              <li>Gestión personalizada de pedidos.</li>
              <li>Actualización diaria de inventario.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- Section 3: Products (The Spreadsheet Data) --- */}
      <section id="productos" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold">Catálogo de Productos</h2>
          <span className="text-sm text-gray-500 italic">Actualizado en tiempo real</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((item) => (
            <div key={item.id} className="border p-6 rounded-lg bg-white shadow-hover transition-shadow">
              <span className="text-xs font-bold uppercase text-blue-600">{item.category}</span>
              <h3 className="text-xl font-bold mt-1">{item.name}</h3>
              <p className={`mt-2 text-sm ${item.stock === 'Disponible' ? 'text-green-600' : 'text-red-600'}`}>
                ● {item.stock}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Contact Box --- */}
      <section id="contacto" className="bg-gray-100 py-16 px-6">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-600">
          <h2 className="text-2xl font-bold text-center mb-6">Contactar para Pedidos</h2>
          <ContactForm />
        </div>
      </section>

      <footer className="py-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Catálogo Médico | México
      </footer>
    </div>
  );
}

export default App;