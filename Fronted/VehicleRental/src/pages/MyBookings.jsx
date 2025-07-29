// pages/MyBookings.jsx
import React, { useEffect, useState } from 'react';
import { FaRegSadTear } from 'react-icons/fa';
import BookingAccordion from '../components/BookingAccordion';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchBookings = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/bookings/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch bookings');

        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const cancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmCancel) return;

    const token = localStorage.getItem('token');
    setCancellingId(bookingId);

    try {
      const res = await fetch(`http://localhost:8080/api/bookings/my`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to cancel booking');

      // Update status locally
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: 'CANCELLED' } : b
        )
      );
    } catch (err) {
      console.error(err);
      alert('Failed to cancel booking');
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">My Bookings</h2>
      {bookings.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 flex flex-col items-center">
          <FaRegSadTear className="text-4xl mb-2" />
          <p>No bookings found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingAccordion
              key={booking.id}
              booking={booking}
              onCancel={cancelBooking}
              isCancelling={cancellingId === booking.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
