import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';

export default function ExploreVehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState(['All']);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/vehicles/all')
      .then(res => res.json())
      .then(data => {
        setVehicles(data);
        const types = Array.from(new Set(data.map(v => v.vehicleType)));
        setVehicleTypes(['All', ...types]);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching vehicles:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...vehicles];

    if (selectedType !== 'All') {
      filtered = filtered.filter(v => v.vehicleType === selectedType);
    }

    if (selectedStatus !== 'All') {
      filtered = filtered.filter(v => v.vehicleStatus === selectedStatus);
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(
        v =>
          v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'year-asc') {
      filtered.sort((a, b) => a.year - b.year);
    } else if (sortOption === 'year-desc') {
      filtered.sort((a, b) => b.year - a.year);
    }

    setFilteredVehicles(filtered);
  }, [vehicles, selectedType, selectedStatus, searchTerm, sortOption]);

  return (
    <>
    <Navbar/>
    <section className="min-h-screen bg-[#f0f4ff] px-6 py-14 lg:px-24">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Explore Vehicles</h1>
        <p className="text-gray-500 text-lg">Find the perfect ride by filtering, sorting, and searching.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <input
          type="text"
          placeholder="Search by brand or model..."
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {vehicleTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          {['All', 'Available', 'Booked'].map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="year-asc">Year: Old to New</option>
          <option value="year-desc">Year: New to Old</option>
        </select>
      </div>

      {/* Vehicle Grid or Loading Skeleton */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow animate-pulse h-72" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVehicles.map(vehicle => (
              <div
                key={vehicle.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="relative">
                  <Link to={`/vehicle/${vehicle.id}`}>
                    <img
                      src={vehicle.imageUrl || 'https://via.placeholder.com/400x250?text=No+Image'}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-52 object-cover rounded-t-xl"
                    />
                  </Link>
                  <span
                    className={`absolute top-3 left-3 text-white text-xs px-2 py-1 rounded ${
                      vehicle.vehicleStatus === 'Available'
                        ? 'bg-green-600'
                        : 'bg-yellow-500'
                    }`}
                  >
                    {vehicle.vehicleStatus}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-sm px-3 py-1 rounded-full">
                    ₹{vehicle.price} / day
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <p className="text-sm text-gray-500">{vehicle.vehicleType} • {vehicle.year}</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 text-sm text-gray-600">
                    <span>🪑 {vehicle.seatingCapacity} Seats</span>
                    <span>⚙️ {vehicle.transmission}</span>
                    <span>⛽ {vehicle.fuelType}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center text-gray-500 mt-14 text-lg">
              No vehicles found matching your filters.
            </div>
          )}
        </>
      )}
    </section>
    </>
  );
}
