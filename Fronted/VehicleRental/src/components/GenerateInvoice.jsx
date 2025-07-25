// src/components/GenerateInvoice.jsx

import React from 'react';
import jsPDF from 'jspdf';
import { FaFilePdf } from 'react-icons/fa';

const GenerateInvoice = ({ booking, user }) => {
  const calculateDuration = (fromTime, toTime) => {
    if (!fromTime || !toTime) return 'N/A';
    const [fromHour, fromMin] = fromTime.split(':').map(Number);
    const [toHour, toMin] = toTime.split(':').map(Number);
    const start = new Date(0, 0, 0, fromHour, fromMin);
    const end = new Date(0, 0, 0, toHour, toMin);
    let diff = (end - start) / (1000 * 60);
    if (diff < 0) diff += 24 * 60;
    const hrs = Math.floor(diff / 60);
    const mins = diff % 60;
    return `${hrs}h ${mins}m`;
  };

  const generateReceipt = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('RentPro', 75, 15);
    doc.setFontSize(10);
    doc.line(10, 18, 200, 18);

    let y = 25;

    // Booking Info
    doc.setFont('helvetica', 'bold');
    doc.text('Booking ID:', 10, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${booking.id}`, 40, y);
    y += 6;

    doc.setFont('helvetica', 'bold');
    doc.text('Date:', 10, y);
    doc.setFont('helvetica', 'normal');
    doc.text(booking.bookingDate || 'N/A', 40, y);
    y += 6;

    doc.setFont('helvetica', 'bold');
    doc.text('Time:', 10, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${booking.fromTime || 'N/A'} - ${booking.toTime || 'N/A'}`, 40, y);
    y += 6;

    doc.setFont('helvetica', 'bold');
    doc.text('Duration:', 10, y);
    doc.setFont('helvetica', 'normal');
    doc.text(calculateDuration(booking.fromTime, booking.toTime), 40, y);
    y += 10;

    // User Info
    doc.setFont('helvetica', 'bold');
    doc.text('User Details', 10, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${user?.firstName || ''} ${user?.lastName || ''}`, 10, y);
    y += 5;
    doc.text(`Email: ${user?.email || 'N/A'}`, 10, y);
    y += 5;
    doc.text(`Phone: ${user?.phone|| 'N/A'}`, 10, y);
    y += 10;

    // Vehicle Info
    doc.setFont('helvetica', 'bold');
    doc.text('Vehicle Info', 10, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.text(`Vehicle Number: ${booking.vehicleNumber || 'N/A'}`, 10, y);
    y += 5;
    doc.text(`Vehicle Type: ${booking.vehicleType || 'N/A'}`, 10, y);
    y += 10;

    // Parking Lot Info
    doc.setFont('helvetica', 'bold');
    doc.text('Parking Lot', 10, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${booking.parkingLot?.name || 'N/A'}`, 10, y);
    y += 5;
    doc.text(`Location: ${booking.parkingLot?.location || 'N/A'}`, 10, y);
    y += 10;

    // Price and Status
    doc.setFont('helvetica', 'bold');
    doc.text('Amount Paid:', 10, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`'₹'${booking.price || '0.00'}`, 50, y);
    y += 6;

    doc.setFont('helvetica', 'bold');
    doc.text('Status:', 10, y);
    doc.setFont('helvetica', 'normal');
    doc.text(booking.status || 'N/A', 50, y);
    y += 15;

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('Thank you for booking with RentPro!', 55, y);
    y += 4;
    doc.text('Visit again', 80, y + 5);

    doc.save(`booking_receipt_${booking.id}.pdf`);
  };

  return (
    <div className="w-full flex justify-end mt-4">
      <button
        onClick={generateReceipt}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl shadow-md transition duration-300"
      >
        <FaFilePdf className="text-white text-lg" />
        Download Receipt
      </button>
    </div>
  );
};

export default GenerateInvoice;
