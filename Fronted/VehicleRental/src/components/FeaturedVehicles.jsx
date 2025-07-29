import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // 👈 Import Link

export default function FeaturedVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedType, setSelectedType] = useState('Car');
  const [vehicleTypes, setVehicleTypes] = useState(['Car']);

  useEffect(() => {
    fetch('http://localhost:8080/api/vehicles/all')
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data);
        const types = Array.from(new Set(data.map((v) => v.vehicleType)));
        setVehicleTypes(['All', ...types]);
      })
      .catch((err) => console.error('Failed to fetch vehicles:', err));
  }, []);

  // ✅ Filter by type AND availability
  const filteredVehicles = vehicles.filter(
    (v) => (selectedType === 'All' || v.vehicleType === selectedType) && v.vehicleStatus === 'Available'
  );

  return (
    <section className="py-16 px-4 md:px-12 lg:px-20 bg-[#f0f4ff]">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Featured Vehicles</h2>
        <p className="text-gray-500">Explore our premium vehicles for your next trip.</p>
      </div>

      <div className="flex justify-center mb-10">
        <select
          className="border border-gray-300 rounded px-4 py-2 text-gray-700"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {vehicleTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredVehicles.map(vehicle => (
          <div key={vehicle.id} className="bg-white rounded-xl shadow p-4">
            <div className="relative">
              <Link to={`/vehicle/${vehicle.id}`}>
                <img
                  src={vehicle.imageUrl}
                  alt={vehicle.brand + ' ' + vehicle.model}
                  className="w-full h-48 object-cover rounded-md cursor-pointer"
                />
              </Link>
              <span
                className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded ${
                  vehicle.vehicleStatus === 'Available'
                    ? 'bg-green-600'
                    : vehicle.vehicleStatus === 'Booked'
                    ? 'bg-yellow-600'
                    : 'bg-gray-600'
                }`}
              >
                {vehicle.vehicleStatus}
              </span>
              <span className="absolute bottom-2 right-2 bg-black text-white text-sm px-3 py-1 rounded">
                ${vehicle.price} / day
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {vehicle.brand} {vehicle.model}
              </h3>
              <p className="text-sm text-gray-500">
                {vehicle.vehicleType} · {vehicle.year}
              </p>
              <div className="mt-2 flex flex-wrap text-sm text-gray-600 gap-x-4 gap-y-1">
                <span>🪑 {vehicle.seatingCapacity} Seats</span>
                <span>⚙️ {vehicle.transmission}</span>
                <span>⛽ {vehicle.fuelType}</span>
                <span>📍 {vehicle.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
