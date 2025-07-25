import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm'; // ✅ Import the separated form

export default function ParkingLotDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lot, setLot] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/api/parking-lots/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => setLot(data))
      .catch((err) => {
        console.error(err);
        alert('Failed to load parking lot details');
      });
  }, [id]);

  if (!lot) {
    return <div className="text-center py-20 text-xl font-semibold text-gray-700">Loading parking lot details...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-6 text-sm text-blue-600 hover:underline cursor-pointer" onClick={() => navigate("/parking")}>
        ← Back to Parking Lots
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <img src={lot.imageUrl} alt={lot.name} className="w-full h-[400px] object-cover rounded-2xl shadow-lg" />

          <div className="mt-6">
            <h1 className="text-3xl font-bold text-gray-900">{lot.name}</h1>
            <p className="text-gray-500 text-md mt-1">{lot.location} • {lot.status}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium text-gray-700">
            <span className="bg-gray-100 px-4 py-2 rounded-full">Capacity: {lot.totalCapacity}</span>
            <span className="bg-gray-100 px-4 py-2 rounded-full">Rate: ${lot.rate}/hr</span>
            <span className="bg-gray-100 px-4 py-2 rounded-full">Open: {lot.openTime}</span>
            <span className="bg-gray-100 px-4 py-2 rounded-full">Close: {lot.closeTime}</span>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Notes</h3>
            <p className="text-gray-600 leading-relaxed">{lot.notes}</p>
          </div>
        </div>

        {/* ✅ Pass lot to BookingForm */}
        <BookingForm lot={lot} />
      </div>
    </div>
  );
}
