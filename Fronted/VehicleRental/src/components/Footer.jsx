import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#f0f4ff] text-gray-700 py-16 px-6 md:px-16 lg:px-24">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

        {/* Branding & Socials */}
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-blue-600 text-3xl">⟲</span> RentPro
          </h2>
          <p className="mt-4 text-sm text-gray-500 max-w-xs">
            Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
          </p>
          <div className="flex gap-4 mt-6 text-xl text-gray-500">
            <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
            <FaEnvelope className="hover:text-gray-700 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">QUICK LINKS</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Browse Cars</a></li>
            <li><a href="#" className="hover:underline">List Your Car</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-4">RESOURCES</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Cancellation Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-4">CONTACT</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>5678 RentPro Avenue</li>
            <li>San Francisco, CA 94107</li>
            <li>+1 987 654321</li>
            <li>support@rentpro.com</li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
