'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-[80vh] bg-[#fff3e6] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-[#ff5601] text-center mb-6">
          Contact Us
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Have a question or feedback? We would love to hear from you!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-medium mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Your name"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-medium mb-1">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="border border-orange-300 rounded-lg px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Write your message here..."
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#ff9560] hover:bg-[#ff5601] text-white font-semibold py-2 rounded-lg shadow-md transition cursor-pointer mt-4"
          >
            Send Message
          </button>
        </form>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Or reach us at: contact@worldrecipes.com</p>
        </div>
      </div>
    </div>
  );
}
