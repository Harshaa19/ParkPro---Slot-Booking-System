import React, { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import AdminDashboard2 from './AdminDashboard2';

export default function ManageVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [editVehicle, setEditVehicle] = useState(null);

  const vehicleTypes = ['Car', 'Bike', 'SUV', 'Van'];

  useEffect(() => {
    fetch("http://localhost:8080/api/vehicles/all")
      .then(res => res.json())
      .then(data => {
        setVehicles(data);
      })
      .catch(err => console.error("Error fetching vehicles:", err));
  }, []);

  useEffect(() => {
    if (selectedType) {
      setFilteredVehicles(vehicles.filter(v => v.vehicleType === selectedType));
    } else {
      setFilteredVehicles([]);
    }
  }, [selectedType, vehicles]);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/vehicles/${id}`, {
        method: "DELETE"
      });
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
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editVehicle)
      });

      if (res.ok) {
        const updated = await res.json();
        setVehicles(prev => prev.map(v => (v.id === updated.id ? updated : v)));
        setEditVehicle(null);
      } else {
        alert("Failed to update vehicle");
      }
    } catch (err) {
      console.error("Error updating vehicle:", err);
    }
  };

  return (
    <div className='flex'>
      <div className='w-64'>
        <AdminDashboard2 />
      </div>
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold mb-6">Manage Vehicles</h2>

        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Select Vehicle Type</label>
          <select
            className="w-full md:w-1/3 px-4 py-2 border rounded-md shadow-sm"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">-- Choose Type --</option>
            {vehicleTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {filteredVehicles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map(vehicle => (
              <div key={vehicle.id} className="bg-white rounded-xl shadow-md border overflow-hidden">
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
                  <p><strong>Price:</strong> ${vehicle.price} / day</p>

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
              </div>
            ))}
          </div>
        ) : selectedType ? (
          <p className="text-gray-500">No vehicles found for type: {selectedType}</p>
        ) : (
          <p className="text-gray-500">Please select a vehicle type.</p>
        )}

        {editVehicle && (
          <form onSubmit={handleUpdate} className="mt-10 bg-gray-50 p-6 rounded-xl shadow-md border max-w-2xl">
            <h3 className="text-xl font-semibold mb-4">Update Vehicle</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Brand"
                value={editVehicle.brand}
                onChange={(e) => setEditVehicle({ ...editVehicle, brand: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Model"
                value={editVehicle.model}
                onChange={(e) => setEditVehicle({ ...editVehicle, model: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Year"
                value={editVehicle.year}
                onChange={(e) => setEditVehicle({ ...editVehicle, year: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={editVehicle.price}
                onChange={(e) => setEditVehicle({ ...editVehicle, price: e.target.value })}
                className="border px-3 py-2 rounded"
              />
            </div>
            <div className="mt-4 flex gap-3">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Save Changes
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
    </div>
  );
}
