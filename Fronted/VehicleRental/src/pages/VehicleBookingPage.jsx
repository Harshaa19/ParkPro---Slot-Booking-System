import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VehicleBookingPage({ vehicle }) {
  const navigate = useNavigate();
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const isBooked = vehicle.vehicleStatus !== 'Available';

  const handleBooking = async (e) => {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to book.');
      return;
    }

    if (!pickupDate || !returnDate) {
      setError('Please select both pickup and return dates.');
      return;
    }

    if (new Date(returnDate) <= new Date(pickupDate)) {
      setError('Return date must be after pickup date.');
      return;
    }

    const bookingData = {
      pickupDate,
      returnDate,
      vehicleId: vehicle.id,
    };

    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || 'Booking failed. Try different dates.');
        return;
      }

      alert('Booking successful!');
      navigate('/user/bookings');
    } catch (err) {
      console.error(err);
      setError('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const days =
    pickupDate && returnDate
      ? Math.max(
          (new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24),
          0
        )
      : 0;

  const totalCost = days * vehicle.price;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg h-fit">
      <div className="text-2xl font-bold text-gray-800 mb-1">
        ₹{vehicle.price} / day
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Per day (includes taxes & fees)
      </p>

      {isBooked && (
        <div className="text-red-600 font-semibold mb-4 text-center">
          This vehicle is currently booked and not available.
        </div>
      )}

      <form onSubmit={handleBooking}>
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Pickup Date</label>
          <input
            type="date"
            min={today}
            className="w-full border border-gray-600 rounded-lg px-3 py-2"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            disabled={isBooked}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Return Date</label>
          <input
            type="date"
            min={pickupDate || today}
            className="w-full border border-gray-600 rounded-lg px-3 py-2"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            disabled={isBooked}
          />
        </div>

        {days > 0 && !isBooked && (
          <div className="mb-4 text-gray-700 font-medium">
            Total: ₹{totalCost.toFixed(2)} for {days} day(s)
          </div>
        )}

        <div className="mb-4">
          <button
            type="submit"
            disabled={loading || isBooked}
            className={`w-full bg-blue-600 hover:bg-blue-800 text-white font-medium rounded-lg py-2 transition ${
              loading || isBooked ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Booking...' : 'Book Now'}
          </button>
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
}
