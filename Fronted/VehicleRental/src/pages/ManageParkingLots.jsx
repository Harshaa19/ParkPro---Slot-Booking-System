import React, { useEffect, useState } from 'react';
import AdminDashboard2 from './AdminDashboard2';
import { Pencil, Trash2 } from 'lucide-react';

export default function ManageParkingLots() {
  const [parkingLots, setParkingLots] = useState([]);
  const [selectedLot, setSelectedLot] = useState('');
  const [editLot, setEditLot] = useState(null);
  const [filteredLots, setFilteredLots] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/parking-lots/all")
      .then(res => res.json())
      .then(data => {
        setParkingLots(data);
      })
      .catch(err => console.error("Error fetching parking lots:", err));
  }, []);

  useEffect(() => {
    if (selectedLot) {
      const [name, location] = selectedLot.split('|');
      setFilteredLots(parkingLots.filter(p => p.name === name && p.location === location));
    } else {
      setFilteredLots([]);
    }
  }, [selectedLot, parkingLots]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authorization token missing. Please login again.');
      return;
    }

    try {
      await fetch(`http://localhost:8080/api/parking-lots/admin/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setParkingLots(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authorization token missing. Please login again.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/parking-lots/admin/${editLot.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(editLot)
      });

      if (res.ok) {
        const updated = await res.json();
        setParkingLots(prev => prev.map(p => (p.id === updated.id ? updated : p)));
        setEditLot(null);
      } else {
        alert("Failed to update parking lot");
      }
    } catch (err) {
      console.error("Error updating lot:", err);
    }
  };

  return (
    <div className='flex'>
      <div className='w-64'>
        <AdminDashboard2 />
      </div>
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold mb-6">Manage Parking Lots</h2>

        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Select Parking Lot</label>
          <select
            className="w-full md:w-1/3 px-4 py-2 border rounded-md shadow-sm"
            value={selectedLot}
            onChange={(e) => setSelectedLot(e.target.value)}
          >
            <option value="">-- Choose Parking Lot --</option>
            {parkingLots.map((lot) => (
              <option key={lot.id} value={`${lot.name}|${lot.location}`}>
                {lot.name} - {lot.location}
              </option>
            ))}
          </select>
        </div>

        {filteredLots.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLots.map((lot) => (
              <div key={lot.id} className="bg-white rounded-xl shadow-md border overflow-hidden">
                {lot.imageUrl && (
                  <img
                    src={lot.imageUrl}
                    alt={lot.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5 flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">{lot.name}</h3>
                  <p><strong>Location:</strong> {lot.location}</p>
                  <p><strong>Status:</strong> {lot.status}</p>
                  <p><strong>Rate:</strong> ₹{lot.rate}/hr</p>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setEditLot(lot)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
                    >
                      <Pencil size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(lot.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : selectedLot ? (
          <p className="text-gray-500">No parking lots found for this selection.</p>
        ) : (
          <p className="text-gray-500">Please select a parking lot.</p>
        )}

        {editLot && (
          <form onSubmit={handleUpdate} className="mt-10 bg-gray-50 p-6 rounded-xl shadow-md border max-w-2xl">
            <h3 className="text-xl font-semibold mb-4">Update Parking Lot</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={editLot.name}
                onChange={(e) => setEditLot({ ...editLot, name: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Location"
                value={editLot.location}
                onChange={(e) => setEditLot({ ...editLot, location: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Rate"
                value={editLot.rate}
                onChange={(e) => setEditLot({ ...editLot, rate: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <select
                value={editLot.status}
                onChange={(e) => setEditLot({ ...editLot, status: e.target.value })}
                className="border px-3 py-2 rounded"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="mt-4 flex gap-3">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditLot(null)}
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
