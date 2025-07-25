import React, { useEffect, useState } from 'react';
import { Navigate, useParams ,useNavigate} from 'react-router-dom';

export default function VehicleDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:8080/api/vehicles/${id}`)
      .then(res => res.json())
      .then(data => setVehicle(data))
      .catch(err => console.error('Failed to fetch vehicle details:', err));
  }, [id]);

  if (!vehicle) {
    return <div className="text-center py-20 text-xl font-semibold text-gray-700">Loading vehicle details...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Back Link */}
      <div className="mb-6 text-sm text-blue-600 hover:underline cursor-pointer" onClick={()=>navigate("/")}>&larr; Back to All Vehicles</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Content */}
        <div className="lg:col-span-2">
          <img
            src={vehicle.imageUrl}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
          />

          <div className="mt-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {vehicle.brand} {vehicle.model}
            </h1>
            <p className="text-gray-500 text-md mt-1">
              {vehicle.vehicleType} • {vehicle.year}
            </p>
          </div>

          {/* Info badges */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium text-gray-700">
            <span className="bg-gray-100 px-4 py-2 rounded-full">{vehicle.seatingCapacity} Seats</span>
            <span className="bg-gray-100 px-4 py-2 rounded-full">{vehicle.fuelType}</span>
            <span className="bg-gray-100 px-4 py-2 rounded-full">{vehicle.transmission}</span>
            <span className="bg-gray-100 px-4 py-2 rounded-full">{vehicle.location}</span>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Description</h3>
            <p className="text-gray-600 leading-relaxed">{vehicle.description}</p>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="bg-white p-6 rounded-2xl shadow-lg h-fit">
          <div className="text-3xl font-bold text-gray-800 mb-1">${vehicle.price}</div>
          <p className="text-sm text-gray-500 mb-4">Per day (includes taxes & fees)</p>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Pickup Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Return Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition">
            Book Now
          </button>
          <p className="text-xs text-gray-400 mt-2 text-center">No credit card required to reserve</p>
        </div>
      </div>
    </div>
  );
}
