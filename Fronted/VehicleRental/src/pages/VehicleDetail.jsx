import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VehicleBookingPage from './VehicleBookingPage';
import Navbar from '../components/NavBar'


export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/api/vehicles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized or not found');
        return res.json();
      })
      .then(data => setVehicle(data))
      .catch(err => {
        console.error('Failed to fetch vehicle details:', err);
        alert('Could not load vehicle details');
      });
  }, [id]);

  if (!vehicle) {
    return (
      <div className="text-center py-20 text-xl font-semibold text-gray-700">
        Loading vehicle details...
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div
        className="mb-6 text-sm text-blue-600 hover:underline cursor-pointer"
        onClick={() => navigate('/')}
      >
        ← Back to All Vehicles
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Side - Vehicle Info */}
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
            <p className="text-sm text-gray-600 mt-1">
              Vehicle Number: <span className="font-medium">{vehicle.vehicleNumber}</span>
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium text-gray-700">
            <span className="bg-gray-100 px-4 py-2 rounded-full">{vehicle.seatingCapacity} Seats</span>
            <span className="bg-gray-100 px-4 py-2 rounded-full">{vehicle.fuelType}</span>
            <span className="bg-gray-100 px-4 py-2 rounded-full">{vehicle.transmission}</span>
            <span className="bg-gray-100 px-4 py-2 rounded-full">{vehicle.location}</span>
            <span className="bg-gray-100 px-4 py-2 rounded-full">{vehicle.vehicleNumber}</span>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full 
                ${vehicle.vehicleStatus === 'Available'
                  ? 'bg-green-100 text-green-700'
                  : vehicle.vehicleStatus === 'Booked'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'}
              `}
            >
              {vehicle.vehicleStatus}
            </span>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Description</h3>
            <p className="text-gray-600 leading-relaxed">{vehicle.description}</p>
          </div>
        </div>

        {/* Right Side - Booking Form */}
        <VehicleBookingPage vehicle={vehicle} />
      </div>
    </div>
    </>
  );
}
