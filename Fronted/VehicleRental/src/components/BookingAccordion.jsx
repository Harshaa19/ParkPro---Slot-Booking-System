import React, { useState } from 'react';
import {
  FaCalendarAlt,
  FaCar,
  FaTrash,
  FaClock,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import GenerateInvoice from './GenerateInvoice';

export default function BookingAccordion({ booking, onCancel, isCancelling, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  const status = booking?.status?.toUpperCase() || 'PENDING';
  const statusColor = {
    CONFIRMED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
  }[status] || 'bg-gray-100 text-gray-700';

  const start = new Date(booking?.pickupDate);
  const end = new Date(booking?.returnDate);
  const durationDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      onCancel(id);
    }
  };

  return (
    <div className="border border-gray-200 rounded-2xl shadow-sm bg-white overflow-hidden transition-all">
      {/* Header */}
      <div
        className="cursor-pointer px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
        onClick={toggleOpen}
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Booking #{booking?.id} — {booking?.vehicleName}
          </h3>
          <span className={`inline-block mt-1 text-xs font-semibold px-3 py-1 rounded-full ${statusColor}`}>
            {status}
          </span>
        </div>
        {isOpen ? (
          <FaChevronUp className="text-gray-500" />
        ) : (
          <FaChevronDown className="text-gray-500" />
        )}
      </div>

      {/* Body */}
      {isOpen && (
        <div className="px-6 py-4 space-y-4 text-sm text-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-indigo-600" />
              <span><strong>Pickup:</strong> {booking?.pickupDate || 'N/A'}</span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-pink-500" />
              <span><strong>Return:</strong> {booking?.returnDate || 'N/A'}</span>
            </div>
            <div className="flex items-center">
              <FaClock className="mr-2 text-yellow-600" />
              <span><strong>Duration:</strong> {durationDays > 0 ? `${durationDays} day(s)` : 'N/A'}</span>
            </div>
            <div className="flex items-center">
              <FaCar className="mr-2 text-green-600" />
              <span><strong>Vehicle No:</strong> {booking?.vehicleNumber || 'N/A'}</span>
            </div>
          </div>

          <div className="flex items-center mt-1 text-green-700 text-base font-semibold">
            💰 Total Amount:
            <span className="ml-2 text-xl">
              ₹{booking?.totalAmount != null ? booking.totalAmount.toFixed(2) : 'N/A'}
            </span>
          </div>

          {/* Cancel Button */}
          <div className="flex justify-start">
            <button
              onClick={() => handleCancel(booking.id)}
              disabled={status === 'CANCELLED' || isCancelling}
              className={`mt-2 px-5 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 ${
                status === 'CANCELLED'
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : isCancelling
                  ? 'bg-yellow-500 text-white cursor-wait'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              <FaTrash />
              {status === 'CANCELLED'
                ? 'Cancelled'
                : isCancelling
                ? 'Cancelling...'
                : 'Cancel Booking'}
            </button>
          </div>

          {/* Invoice Generator */}
          <div className="pt-4 border-t border-gray-200">
            <GenerateInvoice booking={booking} user={user} />
          </div>
        </div>
      )}
    </div>
  );
}
