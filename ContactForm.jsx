import React, { useState } from 'react';

export default function ContactForm() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Enviando...");
    const formData = new FormData(event.target);

    // TODO: Replace with your actual Access Key
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("¡Mensaje enviado con éxito!");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
        <input type="text" name="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Hospital / Empresa</label>
        <input type="text" name="subject" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
        <input type="email" name="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Mensaje / Pedido</label>
        <textarea name="message" required rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"></textarea>
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-bold">
        Enviar Mensaje
      </button>
      <p className="text-center text-sm mt-2 text-gray-600">{result}</p>
    </form>
  );
}