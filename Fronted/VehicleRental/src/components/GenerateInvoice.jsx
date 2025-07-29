import React, { useRef } from 'react';
import { FaPrint } from 'react-icons/fa';

const GenerateInvoice = ({ booking, user }) => {
  const printRef = useRef();

  const calculateDurationInDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 'N/A';
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMs = end - start;
    const days = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return `${days} day(s)`;
  };

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // optional
  };

  return (
    <div>
      {/* Print Button */}
      <div className="w-full flex justify-end mt-4">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
        >
          <FaPrint className="text-white text-lg" />
          Print Receipt
        </button>
      </div>

      {/* Printable Content */}
      <div className="hidden print:block mt-8 px-6" ref={printRef}>
        <div className="max-w-2xl mx-auto border border-gray-300 rounded-2xl p-8 shadow-lg bg-white text-gray-800">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-blue-700">RentPro Booking Receipt</h2>
            <p className="text-sm text-gray-500">Your rental confirmation & invoice</p>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <h4 className="text-md font-semibold border-b border-gray-300 mb-2 pb-1 text-gray-600">Booking Details</h4>
              <p><strong>Booking ID:</strong> {booking.id}</p>
              <p><strong>Pickup Date:</strong> {booking.pickupDate}</p>
              <p><strong>Return Date:</strong> {booking.returnDate}</p>
              <p><strong>Duration:</strong> {calculateDurationInDays(booking.pickupDate, booking.returnDate)}</p>
            </div>

            <div>
              <h4 className="text-md font-semibold border-b border-gray-300 mb-2 pb-1 text-gray-600">User Details</h4>
              <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
              <p><strong>Email:</strong> {user?.email}</p>
            </div>

            <div>
              <h4 className="text-md font-semibold border-b border-gray-300 mb-2 pb-1 text-gray-600">Vehicle Details</h4>
              <p><strong>Vehicle Number:</strong> {booking.vehicleNumber}</p>
            </div>

            <div>
              <h4 className="text-md font-semibold border-b border-gray-300 mb-2 pb-1 text-gray-600">Payment & Status</h4>
              <p><strong>Total Amount:</strong> ₹{booking.totalAmount != null ? booking.totalAmount.toFixed(2) : 'N/A'}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </div>
          </div>

          <div className="mt-6 border-t pt-4 text-center text-sm text-gray-500">
            <p>Thank you for renting with <span className="font-semibold text-blue-600">RentPro</span>!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateInvoice;
