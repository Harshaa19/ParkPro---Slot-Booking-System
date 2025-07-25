import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookingForm({ lot }) {
  const navigate = useNavigate();

  const [bookingDate, setBookingDate] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loginPrompt, setLoginPrompt] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    if (!token) {
      setLoginPrompt('Please login to book your slot.');
      return;
    }

    if (!bookingDate || !fromTime || !toTime || !vehicleNumber || !vehicleType) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/bookings/parking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vehicleNumber,
          vehicleType,
          bookingDate,
          fromTime,
          toTime,
          parkingLotId: lot.id,
        }),
      });

      if (response.ok) {
        setSuccess('Parking spot reserved successfully!');
        setBookingDate('');
        setFromTime('');
        setToTime('');
        setVehicleNumber('');
        setVehicleType('');
        setTimeout(() => navigate('/my-bookings'), 2000);
      } else {
        const msg = await response.text();
        setError(msg || 'Booking failed');
        console.log(localStorage.getItem('token'));
      }
    } catch (err) {
      console.error(err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg h-fit">
      <div className="text-2xl font-bold text-gray-800 mb-1">Reserve Spot</div>
      <p className="text-sm text-gray-500 mb-4">Fill details to reserve a spot</p>

      <form onSubmit={handleBooking}>
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Vehicle Number</label>
          <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Vehicle Type</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
            <option value="">Select Type</option>
            {lot.vehicleTypes?.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Date</label>
          <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">From Time</label>
          <input type="time" className="w-full border border-gray-300 rounded-lg px-3 py-2" value={fromTime} onChange={(e) => setFromTime(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">To Time</label>
          <input type="time" className="w-full border border-gray-300 rounded-lg px-3 py-2" value={toTime} onChange={(e) => setToTime(e.target.value)} />
        </div>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition">
          Reserve Spot
        </button>
      </form>

      {loginPrompt && (
        <p className="mt-3 text-sm text-red-600 text-center">
          {loginPrompt}{' '}
          <span onClick={() => navigate('/userlogin')} className="text-blue-600 underline cursor-pointer">Login here</span>
        </p>
      )}
    </div>
  );
}
