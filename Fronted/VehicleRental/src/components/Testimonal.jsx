// import React from 'react';
// import { FaStar } from 'react-icons/fa';

// const testimonials = [
//   {
//     id: 1,
//     name: 'Aarav Sharma',
//     location: 'Mumbai, India',
//     image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200',
//     rating: 5,
//     review:
//       'The rental process was incredibly smooth. The car was clean, well-maintained, and exactly what I booked. Highly recommend their service!',
//   },
//   {
//     id: 2,
//     name: 'Emily Watson',
//     location: 'London, UK',
//     image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200',
//     rating: 4,
//     review:
//       'Great experience! I rented a scooter for city rides and it was in perfect condition. The support team was friendly and responsive.',
//   },
//   {
//     id: 3,
//     name: 'Ravi Patel',
//     location: 'Ahmedabad, India',
//     image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200',
//     rating: 5,
//     review:
//       'Affordable prices and a wide variety of vehicles. Booking was quick and hassle-free. I’ll definitely rent again on my next trip!',
//   },
// ];

// const StarRating = ({ count }) => (
//   <div className="flex gap-1">
//     {[...Array(5)].map((_, index) => (
//       <FaStar
//         key={index}
//         className={index < count ? 'text-yellow-400' : 'text-gray-300'}
//         size={16}
//       />
//     ))}
//   </div>
// );

// const Testimonial = () => {
//   return (
//     <section className="bg-[#f0f4ff] py-20 px-6 md:px-12 lg:px-24">
//       <div className="text-center max-w-3xl mx-auto">
//         <h2 className="text-4xl font-bold mb-4 text-gray-800">What Our Renters Say</h2>
//         <p className="text-gray-600">
//           Our customers love our reliable and convenient vehicle rental service. Here’s what they have to say.
//         </p>
//       </div>

//       <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {testimonials.map((testimonial) => (
//           <div
//             key={testimonial.id}
//             className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
//           >
//             <div className="flex items-center gap-4">
//               <img
//                 src={testimonial.image}
//                 alt={testimonial.name}
//                 className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
//               />
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
//                 <p className="text-sm text-gray-500">{testimonial.location}</p>
//               </div>
//             </div>
//             <div className="mt-4">
//               <StarRating count={testimonial.rating} />
//               <p className="text-gray-600 mt-3 text-sm">"{testimonial.review}"</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Testimonial;

import React from 'react';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Aarav Sharma',
    location: 'Mumbai, India',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200',
    rating: 5,
    review:
      'The booking process was incredibly smooth. The parking spot was clean, secure, and exactly as described. Highly recommend their service!',
  },
  {
    id: 2,
    name: 'Emily Watson',
    location: 'London, UK',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200',
    rating: 4,
    review:
      'Great experience! I found a nearby parking spot for my weekend trip. Easy to reserve and good customer support.',
  },
  {
    id: 3,
    name: 'Ravi Patel',
    location: 'Ahmedabad, India',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200',
    rating: 5,
    review:
      'Affordable rates and plenty of options. Booking a parking space took just a few clicks. Will definitely use again!',
  },
];

const StarRating = ({ count }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < count ? 'text-yellow-400' : 'text-gray-300'}
        size={16}
      />
    ))}
  </div>
);

const Testimonial = () => {
  return (
    <section className="bg-[#f0f4ff] py-20 px-6 md:px-12 lg:px-24">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">What Our Parkers Say</h2>
        <p className="text-gray-600">
          Our users appreciate the convenience and safety of our parking services. Here's what they had to say.
        </p>
      </div>

      <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="mt-4">
              <StarRating count={testimonial.rating} />
              <p className="text-gray-600 mt-3 text-sm">"{testimonial.review}"</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
