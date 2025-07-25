// components/BookingAccordion.jsx
import React, { useState } from 'react';
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaCar,
  FaTrash,
} from 'react-icons/fa';
import GenerateInvoice from './GenerateInvoice';

export default function BookingAccordion({ booking, onCancel, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  const parseTimeToMinutes = (timeStr) => {
    if (!timeStr || !timeStr.includes(':')) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const date = booking.bookingDate || booking.startDate?.split('T')[0] || 'N/A';
  const fromTime = booking.fromTime || booking.startDate?.split('T')[1]?.slice(0, 5) || 'N/A';
  const toTime = booking.toTime || booking.endDate?.split('T')[1]?.slice(0, 5) || 'N/A';

  const fromMinutes = parseTimeToMinutes(fromTime);
  const toMinutes = parseTimeToMinutes(toTime);
  const durationMinutes = toMinutes - fromMinutes;
  const durationHours = durationMinutes > 0 ? durationMinutes / 60 : 0;

  const pricePerHour = booking.parkingSpot?.pricePerHour || booking.pricePerHour || 0;
  const totalPrice = booking.price || (pricePerHour && durationHours ? durationHours * pricePerHour : 0);

  const vehicle = booking.vehicleNumber || booking.vehicle?.vehicleNumber || 'N/A';
  const location = booking.parkingLot?.name || 'Unknown Lot';
  const place = booking.parkingLot?.location || 'Unknown';

  const status = booking.status?.toUpperCase() || 'PENDING';
  const statusColor = {
    CONFIRMED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
  }[status] || 'bg-gray-100 text-gray-800';

  return (
    <div className="border border-gray-200 rounded-xl shadow-sm bg-white">
      <div
        className="cursor-pointer px-5 py-4 flex justify-between items-center hover:bg-gray-50 transition"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-semibold text-gray-700">Booking #{booking.id}</h3>
        <span className="text-sm text-gray-500">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="px-6 pb-5 pt-2 text-gray-700 text-sm space-y-3">
          {/* Booking Status Badge */}
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
            Status: {status}
          </div>

          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-indigo-500" />
            Date: <span className="ml-2">{date}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-2 text-yellow-500" />
            Time: <span className="ml-2">{fromTime} - {toTime}</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-red-500" />
            Location: <span className="ml-2">{location} ({place})</span>
          </div>
          <div className="flex items-center">
            <FaCar className="mr-2 text-green-600" />
            Vehicle: <span className="ml-2">{vehicle}</span>
          </div>

          
          <div className="flex items-center">
            ⏱ Duration: <span className="ml-2 font-medium">{durationHours.toFixed(2)} hour(s)</span>
          </div>
          <div className="flex items-center text-green-700 font-semibold">
            💰 Total Price: <span className="ml-2 text-xl">₹{totalPrice.toFixed(2)}</span>
          </div>

          {booking.status !== 'CANCELLED' && (
            <button
              onClick={() => onCancel(booking.id)}
              className="mt-3 bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 flex items-center justify-center"
            >
              <FaTrash className="mr-2" /> Cancel Booking
            </button>
          )}

          <div className="mt-2">
            <GenerateInvoice booking={booking} user={user} />
          </div>
        </div>
      )}
    </div>
  );
}
