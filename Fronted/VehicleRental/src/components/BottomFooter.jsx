import React from 'react';

const BottomFooter = () => {
  return (
    <div className="bg-[#f0f4ff] border-t border-gray-200 pt-6 pb-4 px-6 md:px-16 lg:px-24 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
      <p>© 2025 CarRental. All rights reserved.</p>
      <div className="flex gap-4">
        <a href="#" className="hover:underline">Privacy</a>
        <span className="hidden md:block">|</span>
        <a href="#" className="hover:underline">Terms</a>
        <span className="hidden md:block">|</span>
        <a href="#" className="hover:underline">Cookies</a>
      </div>
    </div>
  );
};

export default BottomFooter;
