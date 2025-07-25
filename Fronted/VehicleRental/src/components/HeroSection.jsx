// import React from 'react';

// const HeroSection = () => {
//   return (
//     <section className="bg-[#f0f4ff] py-20 px-6 md:px-16 lg:px-24">
//       <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        
//         {/* Left content */}
//         <div className="max-w-xl text-center lg:text-left">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//             Rent Your Ride in Minutes
//           </h1>
//           <p className="text-gray-600 text-base md:text-lg mt-4">
//             Choose from a wide range of cars, bikes, and SUVs. Whether it's a quick trip or a weekend getaway, we have the perfect vehicle for you.
//           </p>
//           <button className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200">
//             Browse Vehicles
//           </button>
//         </div>

//         {/* Right image */}
//         <div className="relative w-full max-w-[900px]">
//           {/* Updated gradient color */}
          
//           <img
//             src="https://purepng.com/public/uploads/large/purepng.com-audi-a4-caraudicars-961524670575xcrug.png"
//             alt="Jeep Rental"
//             className="relative z-10 w-850 object-contain"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-[#f0f4ff] py-20 px-6 md:px-16 lg:px-24">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        
        {/* Left content */}
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Find Your Perfect Parking Spot
          </h1>
          <p className="text-gray-600 text-base md:text-lg mt-4">
            Discover safe and affordable parking spots near you. Whether it's for a few hours or an extended stay, we have the perfect spot waiting for you.
          </p>
          <button className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200">
            Find Parking
          </button>
        </div>

        {/* Right image */}
        <div className="relative w-full max-w-[900px]">
          <img
            src="https://tse4.mm.bing.net/th/id/OIP.qHvShoEP6w6Kq8OL-wimtwHaEJ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" 
            alt="Parking Spot"
            className="relative z-10 w-full object-contain rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
