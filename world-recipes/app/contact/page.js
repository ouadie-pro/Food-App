'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-lg overflow-hidden">
        <div className="bg-orange-primary px-6 py-5">
          <h1 className="text-2xl font-bold text-white text-center">
            Contact Us
          </h1>
          <p className="text-orange-100 text-sm text-center mt-1">
            Have a question or feedback? We would love to hear from you!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-primary"
              placeholder="Your name"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-primary"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-700 font-medium mb-2">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:border-orange-primary"
              placeholder="Write your message here..."
              required
            />
          </div>

          <button
            type="submit"
            className="bg-orange-primary hover:bg-orange-light text-white font-semibold py-3 rounded-lg transition-colors mt-2"
          >
            {submitted ? 'Message Sent!' : 'Send Message'}
          </button>
        </form>

        <div className="px-6 pb-6 text-center">
          <p className="text-gray-500 text-sm">
            Or reach us at: <span className="text-orange-primary font-medium">contact@worldrecipes.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}