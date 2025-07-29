import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaRegSadTear } from 'react-icons/fa';
import BookingAccordion from '../components/BookingAccordion';
import Navbar from '../components/NavBar';

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [sortByDate, setSortByDate] = useState('DESC');
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  const token = localStorage.getItem('token');

  const fetchUserDetails = async () => {
    if (!token) return setError('You are not logged in');
    try {
      const res = await fetch(`http://localhost:8080/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch user details');
      const data = await res.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchBookings = async () => {
    if (!token) return setError('You are not logged in');
    try {
      const res = await fetch(`http://localhost:8080/api/bookings/my-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch bookings');
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    const confirm = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirm) return;
    try {
      const res = await fetch(`http://localhost:8080/api/bookings/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to cancel booking');

      // Update only the booking status in the nested object
      setBookings((prev) =>
        prev.map((b) =>
          b.booking.id === id
            ? { ...b, booking: { ...b.booking, status: 'CANCELLED' } }
            : b
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered = filterStatus === 'ALL'
    ? bookings
    : bookings.filter((b) => b.booking.status === filterStatus);

  const sorted = [...filtered].sort((a, b) => {
    const dateA = new Date(a.booking.pickupDate);
    const dateB = new Date(b.booking.pickupDate);
    return sortByDate === 'ASC' ? dateA - dateB : dateB - dateA;
  });

  const indexOfLast = currentPage * bookingsPerPage;
  const indexOfFirst = indexOfLast - bookingsPerPage;
  const currentBookings = sorted.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / bookingsPerPage);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 flex items-start gap-6 mb-10">
          <FaUserCircle className="text-6xl text-blue-500" />
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h2>
            {user ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-gray-700 text-sm">
                <div><span className="font-medium text-gray-600">Name:</span> {user.firstName} {user.lastName}</div>
                <div><span className="font-medium text-gray-600">Email:</span> {user.email}</div>
                <div><span className="font-medium text-gray-600">Phone:</span> {user.phoneNumber}</div>
                <div><span className="font-medium text-gray-600">Role:</span> {user.role}</div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Loading user info...</p>
            )}
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="space-x-2">
            {['ALL', 'CONFIRMED', 'CANCELLED'].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setFilterStatus(status);
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <button
            onClick={() => setSortByDate(sortByDate === 'ASC' ? 'DESC' : 'ASC')}
            className="px-4 py-1.5 text-sm rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Sort by Date: {sortByDate}
          </button>
        </div>

        {/* Booking List */}
        {loading ? (
          <p className="text-center text-gray-500 text-sm">Loading bookings...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-sm">{error}</p>
        ) : filtered.length === 0 ? (
          <div className="text-center mt-20">
            <FaRegSadTear className="text-6xl text-gray-300 mb-4 mx-auto" />
            <p className="text-lg text-gray-600 font-medium">No bookings found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentBookings.map(({ booking, vehicle }, index) => (
              <BookingAccordion
                key={booking.id ?? `booking-${index}`}
                booking={{ ...booking, vehicleNumber: vehicle.vehicleNumber }}
                onCancel={cancelBooking}
                user={user} // ✅ Pass user here
              />

            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={`page-${i + 1}`}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 text-sm rounded-md flex items-center justify-center transition ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
