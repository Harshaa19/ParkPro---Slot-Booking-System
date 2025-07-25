import React, { useEffect, useState } from 'react';
import { FaRegSadTear } from 'react-icons/fa';
import BookingAccordion from '../components/BookingAccordion';

const getUserIdFromToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  } catch (e) {
    return null;
  }
};

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [sortByDate, setSortByDate] = useState('DESC'); // ASC or DESC
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 6;

  const token = localStorage.getItem('token');
  const userId = getUserIdFromToken(token);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/bookings/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmCancel) return;

    try {
      const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to cancel booking');

      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: 'CANCELLED' } : b
        )
      );
    } catch (err) {
      alert('Error cancelling booking: ' + err.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBookings();
    } else {
      setError('Invalid token: Unable to extract user ID');
      setLoading(false);
    }
  }, [userId]);

  // Apply filter and sort
  const filteredBookings =
    filterStatus === 'ALL'
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    const dateA = new Date(a.bookingDate);
    const dateB = new Date(b.bookingDate);
    return sortByDate === 'ASC' ? dateA - dateB : dateB - dateA;
  });

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = sortedBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 drop-shadow">
        🧾 My Bookings
      </h1>

      {/* Filter & Sort */}
      <div className="flex flex-wrap justify-center space-x-4 mb-6">
        {['ALL', 'CONFIRMED', 'CANCELLED'].map((status) => (
          <button
            key={status}
            onClick={() => {
              setFilterStatus(status);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full border ${
              filterStatus === status
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            {status}
          </button>
        ))}
        <button
          onClick={() => setSortByDate(sortByDate === 'ASC' ? 'DESC' : 'ASC')}
          className="px-4 py-2 rounded-full bg-white text-gray-700 border border-gray-300"
        >
          Sort by Date: {sortByDate}
        </button>
      </div>

      {loading && <p className="text-center text-gray-600 text-lg">Loading...</p>}
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}
      {!loading && filteredBookings.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20">
          <FaRegSadTear className="text-6xl text-gray-400 mb-4" />
          <p className="text-xl font-medium text-gray-600">No bookings found</p>
        </div>
      )}

      {/* Booking Accordion List */}
      <div className="space-y-4">
        {currentBookings.map((booking) => (
          <BookingAccordion
            key={booking.id}
            booking={booking}
            onCancel={cancelBooking}
            user={{ id: userId }}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
