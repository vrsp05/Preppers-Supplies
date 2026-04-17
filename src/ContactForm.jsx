import React, { useState } from 'react';

export default function ContactForm() {
  const [result, setResult] = useState("");
  const [formData, setFormData] = useState({ name: "", subject: "", email: "", message: "" });
  const [validationErrors, setValidationErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.subject.trim()) errors.subject = "Organization/Company is required";
    if (!formData.email.trim()) errors.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Please enter a valid email";
    if (!formData.message.trim()) errors.message = "Your request/requirements are required";
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleConfirmSubmit = async () => {
    if (!agreedToTerms) {
      setValidationErrors(prev => ({ ...prev, checkbox: "Debes aceptar los términos para continuar" }));
      return;
    }

    setResult("Sending...");
    const submitFormData = new FormData();
    submitFormData.append("access_key", import.meta.env.VITE_ACCESS_KEY);
    submitFormData.append("subject", "🚨 NEW ORDER: Prepper's Medical Warehouse");
    submitFormData.append("from_name", "Prepper's Medical Warehouse USA");
    submitFormData.append("name", formData.name);
    submitFormData.append("organization", formData.subject);
    submitFormData.append("email", formData.email);
    submitFormData.append("message", formData.message);

    try {
      const response = await fetch(import.meta.env.VITE_CONTACT_SCRIPT_URL, {
        method: "POST",
        body: submitFormData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully! We'll be in touch within 1-3 business days.");
        setFormData({ name: "", subject: "", email: "", message: "" });
        setAgreedToTerms(false);
        setShowModal(false);
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Error sending message");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitClick} className="space-y-4">
        <input type="hidden" name="subject" value="🚨 NEW ORDER: Prepper's Medical Warehouse" />
        <input type="hidden" name="from_name" value="Prepper Med Supply USA" />
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border text-gray-900 bg-white ${validationErrors.name ? 'border-red-500' : 'border-gray-300'}`} 
          />
          {validationErrors.name && <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Organization / Company</label>
          <input 
            type="text" 
            name="subject" 
            value={formData.subject}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border text-gray-900 bg-white ${validationErrors.subject ? 'border-red-500' : 'border-gray-300'}`} 
          />
          {validationErrors.subject && <p className="text-red-500 text-sm mt-1">{validationErrors.subject}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input 
            type="text" 
            name="email" 
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border text-gray-900 bg-white ${validationErrors.email ? 'border-red-500' : 'border-gray-300'}`} 
          />
          {validationErrors.email && <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Your Request / Requirements</label>
          <textarea 
            name="message" 
            value={formData.message}
            onChange={handleInputChange}
            rows="4" 
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border text-gray-900 bg-white ${validationErrors.message ? 'border-red-500' : 'border-gray-300'}`}
          ></textarea>
          {validationErrors.message && <p className="text-red-500 text-sm mt-1">{validationErrors.message}</p>}
        </div>
        <button type="submit" className="w-full !bg-green-700 !text-white py-3 px-4 rounded-md hover:!bg-green-800 transition-colors font-bold" style={{ colorScheme: 'light' }}>
          Submit Request
        </button>
        {result && (
          <div className={`mt-4 p-4 rounded-lg text-center font-semibold text-base ${result.includes('successfully') ? 'bg-green-50 text-green-800 border-2 border-green-200' : 'bg-red-50 text-red-800 border-2 border-red-200'}`}>
            {result}
          </div>
        )}
      </form>

      {/* Disclaimer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-black text-yellow-900 mb-6 uppercase tracking-tight">Important Confirmation</h2>
            
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-5 mb-6">
              <p className="text-sm text-yellow-900 font-semibold leading-relaxed mb-4">
                Please confirm you understand this important information about our products:
              </p>
              <ul className="space-y-3 text-sm text-yellow-800 font-medium">
                <li>✓ Products have <span className="font-bold">expired dates</span></li>
                <li>✓ Will only be used for <span className="font-bold">educational and demonstration purposes</span></li>
                <li>✓ <span className="font-bold">NOT</span> authorized for patient or clinical use</li>
              </ul>
            </div>

            <div className="flex items-start gap-3 mb-8">
              <input 
                type="checkbox" 
                id="agree" 
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  if (e.target.checked) {
                    setValidationErrors(prev => ({ ...prev, checkbox: "" }));
                  }
                }}
                className="mt-1 w-5 h-5 cursor-pointer accent-green-700"
              />
              <label htmlFor="agree" className="text-sm text-gray-700 font-medium cursor-pointer">
                I confirm that I've read and understand that products are for educational and demonstration use only.
              </label>
            </div>
            {validationErrors.checkbox && <p className="text-red-600 text-sm mb-6 font-semibold bg-red-50 p-3 rounded-lg">{validationErrors.checkbox}</p>}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setAgreedToTerms(false);
                  setValidationErrors(prev => ({ ...prev, checkbox: "" }));
                }}
                className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 px-4 py-3 bg-green-700 text-white rounded-lg font-bold hover:bg-green-800 transition-colors"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}