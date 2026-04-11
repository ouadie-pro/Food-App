'use client';

import { useState } from 'react';
import { IoMailOutline, IoSendSharp, IoCheckmarkCircle } from 'react-icons/io5';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setIsLoading(false);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-cream-100 via-white to-orange-muted flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-primary rounded-2xl shadow-button mb-4">
            <IoMailOutline className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Contact <span className="text-orange-primary">Us</span>
          </h2>
          <p className="text-gray-600 mt-3 max-w-md mx-auto">
            Have a question or feedback? We would love to hear from you!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-card-hover p-8 lg:p-10 flex flex-col gap-6 animate-fade-in-up">
          <div className="group">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Your Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 
                transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-primary/20 
                focus:border-orange-primary hover:border-orange-primary/50"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="group">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 
                transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-primary/20 
                focus:border-orange-primary hover:border-orange-primary/50"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="group">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 h-40 resize-none text-gray-900 placeholder-gray-400 
                transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-primary/20 
                focus:border-orange-primary hover:border-orange-primary/50"
              placeholder="Write your message here..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || isSubmitted}
            className="w-full bg-orange-primary hover:bg-orange-dark text-white font-semibold py-4 rounded-2xl 
              shadow-button hover:shadow-lg hover:shadow-orange-primary/40 transition-all duration-300 
              hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 
              flex items-center justify-center gap-3 mt-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : isSubmitted ? (
              <>
                <IoCheckmarkCircle className="w-5 h-5" />
                Message Sent!
              </>
            ) : (
              <>
                <IoSendSharp className="w-5 h-5" />
                Send Message
              </>
            )}
          </button>

          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-gray-500 text-sm">
              Or reach us at: <a href="mailto:contact@worldrecipes.com" className="text-orange-primary font-medium hover:underline">contact@worldrecipes.com</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}