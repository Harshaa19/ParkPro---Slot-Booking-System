import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaUserCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaIdBadge,
  FaUserTag,
  FaRegSadTear,
} from 'react-icons/fa';
import UserDetail from '../components/UserDetail';
import BookingAccordion from '../components/BookingAccordion';

export default function UserProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (authUser === null) return;

    if (!authUser) {
      navigate('/userlogin');
      return;
    }

    if (authUser.id !== parseInt(id)) {
      navigate(`/user/${authUser.id}`);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You are not logged in.');
      navigate('/userlogin');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) setUser(data);
        else setError(data.message || 'Failed to fetch user');
      } catch (err) {
        setError('Error loading user data');
      } finally {
        setLoadingUser(false);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/bookings/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) setBookings(data);
        else setError(data.message || 'Failed to fetch bookings');
      } catch (err) {
        setError('Error loading bookings');
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchUserDetails();
    fetchBookings();
  }, [authUser, id, navigate]);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to cancel booking.');
      }
    } catch (err) {
      alert('Something went wrong while canceling the booking.');
    }
  };

  if (!authUser || loadingUser) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-20 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-8 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* USER PROFILE SECTION */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md px-10 py-8 flex flex-col md:flex-row items-start gap-8">
          <div className="flex-shrink-0 self-center md:self-start">
            <FaUserCircle className="text-gray-500 text-[120px]" />
          </div>
          <div className="flex-1 space-y-4 text-gray-800">
            <h1 className="text-3xl font-extrabold tracking-tight text-blue-900">
              {user.firstName} {user.lastName}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
              <UserDetail icon={<FaIdBadge />} label="User ID" value={user.id} />
              <UserDetail icon={<FaEnvelope />} label="Email" value={user.email} />
              <UserDetail icon={<FaPhoneAlt />} label="Phone" value={user.phoneNumber || 'N/A'} />
              <UserDetail icon={<FaUserTag />} label="Role" value={user.role.replace('ROLE_', '')} />
              <UserDetail icon="🕒" label="Account Created" value="2024-06-01 (Sample)" />
              <UserDetail icon="🚪" label="Last Login" value="2025-07-18 09:23 AM (Sample)" />
            </div>
          </div>
        </div>

        {/* BOOKINGS SECTION */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">My Bookings</h2>

          {loadingBookings ? (
            <div className="text-gray-600 animate-pulse">Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-10">
              <FaRegSadTear className="text-5xl text-gray-400 mb-2" />
              <p className="text-lg text-gray-500 italic">No bookings available.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <BookingAccordion
                  key={booking.id}
                  booking={booking}
                  onCancel={handleCancelBooking}
                  user={user}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
