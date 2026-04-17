import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ContactForm from './ContactForm';
import ProductTable from './ProductTable';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  const fetchProducts = async () => {
    try {
      const res = await fetch(SCRIPT_URL);
      const data = await res.json();
      setProducts(data);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch on initial load
    fetchProducts();

    // Set up interval to refresh every 2 hours (7200000 milliseconds)
    const interval = setInterval(fetchProducts, 7200000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white font-sans selection:bg-green-100 selection:text-green-900 overflow-x-hidden">
      <Navbar />

      {/* --- Section 1: Home / About --- */}
      <section id="home" className="w-full relative min-h-[80vh] flex flex-col justify-center py-24 px-6">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10"></div>
        
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Prepper's Medical <span className="text-green-700 font-black">Warehouse</span>
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            Equipping preparedness enthusiasts and institutions with high-quality medical supplies for emergency readiness, training, and education.
          </p>
          
          <div className="mt-16 p-10 bg-white rounded-[2rem] shadow-xl shadow-green-700/5 border border-white relative">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-green-700 mb-4 text-center w-full">Who We Are</h2>
            <p className="text-xl leading-relaxed text-gray-700 font-medium italic mb-6">
              "With deep expertise in emergency preparedness, we've built a reputation as a trusted source of high-quality medical supplies. Our commitment is ensuring every product meets the highest standards for reliability and effectiveness."
            </p>
            <div className="border-t border-gray-200 pt-6">
              <p className="text-lg text-gray-700 font-semibold mb-3">We're proud to offer:</p>
              <ul className="space-y-3 text-base text-gray-700 font-medium mb-8">
                <li>✓ <span className="font-bold text-green-900">High-quality educational medical supplies</span> for preppers and institutions</li>
                <li>✓ Products <span className="font-bold text-green-900">sterilized and sealed</span> in new condition</li>
                <li>✓ Perfect solutions for <span className="font-bold text-green-900">emergency preparedness, training, and educational purposes</span></li>
              </ul>
              <div className="text-center">
                <p className="text-gray-600 font-medium mb-4">Ready to build your emergency medical kit?</p>
                <a 
                  href="#catalog" 
                  className="inline-block bg-green-700 text-white font-bold px-8 py-3 rounded-xl hover:bg-green-800 transition-all shadow-md hover:shadow-lg !text-white"
                >
                  View Catalog
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 2: About --- */}
      <section id="about" className="w-full min-h-[80vh] flex flex-col justify-center py-24 bg-green-700 text-white px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Our Mission</h2>
            <p className="text-green-100 text-lg leading-relaxed mb-8">
              We specialize in providing high-quality medical supplies for emergency preparedness. We bridge the gap between quality supplies and those who take their preparedness seriously, offering a dynamic catalog and personalized logistics.
            </p>
            <div className="space-y-4">
              {['Strategic Distribution', 'Certified Quality', 'Expert Support'].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-green-300 rounded-full"></div>
                  <span className="font-semibold tracking-wide uppercase text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-green-600/50 border border-green-500 p-8 rounded-3xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 italic text-green-100">Our Vision</h3>
            <p className="text-green-50 leading-relaxed">
              We're not just selling products—we're equipping preppers and institutions with reliable, quality medical supplies to ensure they're ready for any emergency.
            </p>
          </div>
        </div>
      </section>

      {/* --- Section 3: Catalog --- */}
      <section id="catalog" className="w-full py-24 bg-white px-4 md:px-12">
        <div className="w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-gray-100 pb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Medical Supplies Catalog</h2>
              <p className="text-green-700 font-medium mt-2 uppercase tracking-widest text-xs">Real-time inventory updates</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4 md:mt-0">
              <p className="text-gray-400 text-sm font-medium italic">Showing {products.length} available items</p>
              <button
                onClick={fetchProducts}
                disabled={loading}
                className="px-4 py-2 !bg-green-700 !text-white rounded-lg font-semibold text-sm hover:!bg-green-800 transition-colors disabled:!bg-slate-700 disabled:!text-white disabled:cursor-not-allowed"
                style={{ colorScheme: 'light' }}
              >
                🔄 Refresh
              </button>
            </div>
          </div>

          {lastUpdated && (
            <div className="mb-4 text-center text-xs text-gray-500 font-medium">
              Last updated: {lastUpdated.toLocaleString('en-US')}
            </div>
          )}

          {/* DISCLAIMER BOX - For Educational Use */}
          <div className="mb-8 p-6 bg-yellow-50 rounded-2xl border-2 border-yellow-200 shadow-md">
            <div className="flex items-start gap-4">
              <div className="text-2xl flex-shrink-0">⚠️</div>
              <div>
                <h3 className="text-base font-black text-yellow-900 mb-2 uppercase tracking-tight">Important - Educational Use Only</h3>
                <p className="text-sm text-yellow-800 font-medium leading-relaxed">
                  These medical supplies are <span className="font-bold">sterilized and sealed (new)</span> but have <span className="font-bold">expired dates</span>. They are designed exclusively for <span className="font-bold">educational, training, and demonstration purposes</span>. <span className="font-bold">NOT</span> authorized for clinical use or patients.
                </p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-900 mx-auto"></div>
              <p className="mt-4 text-gray-500 font-medium tracking-wide">Loading catalog...</p>
            </div>
          ) : (
            <div className="w-full overflow-hidden">
               <ProductTable data={products} />
            </div>
          )}
        </div>
      </section>

      {/* --- Section 4: Quote Request --- */}
      <section id="quote" className="w-full min-h-screen py-24 bg-gray-100 px-6 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl border-t-[12px] border-green-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-0 opacity-50"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-4 tracking-tight">Request a Quote</h2>
              <p className="text-center text-gray-500 mb-4 max-w-md mx-auto leading-relaxed font-medium">
                Send us your requirements and we'll get back to you with a personalized quote.
              </p>
              <p className="text-center text-green-700 mb-12 max-w-md mx-auto leading-relaxed font-bold">
                ⏱️ Response within 1-3 business days.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-12 md:py-16 text-center bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <p className="font-black text-gray-900 uppercase tracking-[0.3em] text-xs mb-2">Prepper's<span className="font-black text-green-700"> Medical Warehouse</span></p>
          <p className="text-gray-400 text-sm font-medium italic mb-8">Emergency medical supplies for the prepared</p>
          
          <div className="h-px w-20 bg-gray-100 mx-auto my-6"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-6">
            <p className="text-gray-600 text-sm font-medium">Built by <span className="font-bold text-gray-900">Victor Santana</span></p>
            <span className="hidden md:inline text-gray-300">•</span>
            <a href="https://github.com/vrsp05" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-800 font-semibold text-sm transition-colors">
              GitHub
            </a>
          </div>
          
          <p className="text-gray-400 text-xs">&copy; {new Date().getFullYear()} Prepper's Medical Warehouse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;