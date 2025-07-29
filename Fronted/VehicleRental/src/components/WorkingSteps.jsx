import React from 'react';
import { MapPin, CalendarDays, Bookmark } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: <MapPin className="w-6 h-6 text-blue-600" />,
    title: 'Select Your Location',
    description: 'Find the perfect pickup spot from our vast network of convenient rental locations.',
  },
  {
    id: 2,
    icon: <CalendarDays className="w-6 h-6 text-blue-600" />,
    title: 'Set the Pickup Date',
    description: 'Choose the date and time that fits your schedule with our flexible booking system.',
  },
  {
    id: 3,
    icon: <Bookmark className="w-6 h-6 text-blue-600" />,
    title: 'Reserve Your Vehicle',
    description: 'Explore our fleet and lock in the vehicle that matches your journey best.',
  },
];

const WorkingSteps = () => {
  return (
    <section className="bg-[#f0f4ff] py-20 px-6 md:px-16 lg:px-24 text-center">
      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Getting Started</h4>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Follow These 3 Simple Steps to Rent with <span className='text-orange-600'>Rent</span><span className='text-green-600'>Pro</span></h2>

      <div className="grid gap-10 md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center text-center max-w-sm mx-auto">
            <div className="p-4 rounded-xl shadow bg-white mb-4">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkingSteps;
