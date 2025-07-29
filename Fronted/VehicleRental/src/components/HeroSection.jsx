import React from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Import useNavigate

const HeroSection = () => {
  const navigate = useNavigate(); // 👈 Initialize navigate

  const handleBrowseClick = () => {
    navigate('/explore'); // 👈 Navigate to /explore
  };

  return (
    <section className="bg-[#f0f4ff] py-20 px-6 md:px-16 lg:px-24">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        
        {/* Left content */}
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Rent Your Ride in Minutes
          </h1>
          <p className="text-gray-600 text-base md:text-lg mt-4">
            Choose from a wide range of cars, bikes, and SUVs. Whether it's a quick trip or a weekend getaway, we have the perfect vehicle for you.
          </p>
          <button
            onClick={handleBrowseClick} // 👈 Set click handler
            className="mt-8 px-6 py-3 bg-sky-800 hover:bg-sky-600 text-white font-semibold rounded-md transition duration-200"
          >
            Browse Vehicles
          </button>
        </div>

        {/* Right image */}
        <div className="relative w-full max-w-[900px]">
          <img
            src="https://purepng.com/public/uploads/large/purepng.com-audi-a4-caraudicars-961524670575xcrug.png"
            alt="Jeep Rental"
            className="relative z-10 w-850 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
