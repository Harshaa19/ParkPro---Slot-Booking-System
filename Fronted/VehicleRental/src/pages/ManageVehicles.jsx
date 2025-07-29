import React, { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import AdminDashboard2 from './AdminDashboard2';
import { useAuth } from '../context/AuthContext';

export default function ManageVehicles() {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [editVehicle, setEditVehicle] = useState(null);

  const vehicleTypes = ['Car', 'Bike', 'SUV', 'Van'];

  const token = user?.token || localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/vehicles/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized or failed to fetch');
        return res.json();
      })
      .then(data => {
        setVehicles(data);
        setFilteredVehicles(data);
      })
      .catch(err => console.error("Error fetching vehicles:", err));
  }, [token]);

  useEffect(() => {
    if (selectedType) {
      setFilteredVehicles(
        vehicles.filter(v => v.vehicleType?.toLowerCase() === selectedType.toLowerCase())
      );
    } else {
      setFilteredVehicles(vehicles);
    }
  }, [selectedType, vehicles]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/vehicles/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete vehicle");

      setVehicles(prev => prev.filter(v => v.id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/vehicles/${editVehicle.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editVehicle),
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();
      setVehicles(prev => prev.map(v => (v.id === updated.id ? updated : v)));
      setEditVehicle(null);
    } catch (err) {
      console.error("Error updating vehicle:", err);
    }
  };

  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <div className="w-64 h-screen fixed left-0 top-0 border-r bg-white shadow-lg z-10">
        <AdminDashboard2 />
      </div>

      {/* Scrollable Content */}
      <div className="ml-64 p-6 flex-1">
        <h2 className="text-2xl font-bold mb-6">Manage Vehicles</h2>

        {/* Filter */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Filter by Type</label>
          <select
            className="w-full md:w-1/3 px-4 py-2 border rounded-md shadow-sm"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All</option>
            {vehicleTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Vehicle Cards */}
        {filteredVehicles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map(vehicle => (
              <div key={vehicle.id} className="bg-white rounded-xl shadow-md border overflow-hidden col-span-1 relative">
                {vehicle.imageUrl && (
                  <img
                    src={vehicle.imageUrl}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5 flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">{vehicle.brand} {vehicle.model}</h3>
                  <p><strong>Type:</strong> {vehicle.vehicleType}</p>
                  <p><strong>Year:</strong> {vehicle.year}</p>
                  <p><strong>Price:</strong> ₹{vehicle.price} / day</p>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setEditVehicle(vehicle)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
                    >
                      <Pencil size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>

                {/* Inline Edit Form */}
                {editVehicle?.id === vehicle.id && (
                  <form onSubmit={handleUpdate} className="bg-gray-100 p-4 mt-4 rounded-xl border-t">
                    <h3 className="text-md font-semibold mb-2">Update Vehicle</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        ['Brand', 'brand'],
                        ['Model', 'model'],
                        ['Year', 'year'],
                        ['Price', 'price'],
                        ['Transmission', 'transmission'],
                        ['Fuel Type', 'fuelType'],
                        ['Seating Capacity', 'seatingCapacity'],
                        ['Location', 'location'],
                      ].map(([label, field]) => (
                        <input
                          key={field}
                          type="text"
                          placeholder={label}
                          value={editVehicle[field]}
                          onChange={(e) => setEditVehicle({ ...editVehicle, [field]: e.target.value })}
                          className="border px-3 py-2 rounded"
                        />
                      ))}
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={editVehicle.imageUrl}
                        onChange={(e) => setEditVehicle({ ...editVehicle, imageUrl: e.target.value })}
                        className="border px-3 py-2 rounded col-span-2"
                      />
                      <textarea
                        placeholder="Description"
                        value={editVehicle.description}
                        onChange={(e) => setEditVehicle({ ...editVehicle, description: e.target.value })}
                        className="border px-3 py-2 rounded col-span-2"
                        rows={3}
                      />
                    </div>
                    <div className="mt-3 flex gap-3">
                      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditVehicle(null)}
                        className="text-gray-600 hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            {selectedType ? `No vehicles found for type: ${selectedType}` : "No vehicles available."}
          </p>
        )}
      </div>
    </div>
  );
}
