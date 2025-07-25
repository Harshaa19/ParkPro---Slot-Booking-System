import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // ⬅️ Use the auth context

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [vehicleDropdown, setVehicleDropdown] = useState(false);
  const { user, logout } = useAuth(); // ⬅️ Access user and logout
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if (user) {
      logout();
      navigate('/');
    } else {
      navigate('/userlogin');
    }
  };

  const navLinksDesktop = (
    <>
      <a href="/" className="text-gray-200 hover:text-white transition">Home</a>

      {/* Dropdown */}
      <div className="relative group">
        <button className="text-gray-200 hover:text-white flex items-center gap-1">
          Parking Spots <FaChevronDown className="text-xs mt-0.5" />
        </button>
        <div className="absolute top-6 left-0 bg-gray-800 rounded-md shadow-md hidden group-hover:block z-10">
          <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">Covered</a>
          <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">Open</a>
          <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">EV-Friendly</a>
        </div>
      </div>

      {user && (
        <>
          <a href={`/user/${user.id}`} className="text-gray-200 hover:text-white transition">My Profile</a>
          <a href="/my-bookings" className="text-gray-200 hover:text-white transition">My Bookings</a>
        </>
      )}
    </>
  );

  const navLinksMobile = (
    <>
      <a href="/" className="text-gray-200 hover:text-white transition">Home</a>

      {/* Dropdown for mobile */}
      <button
        onClick={() => setVehicleDropdown(!vehicleDropdown)}
        className="text-gray-200 hover:text-white flex items-center justify-between w-full"
      >
        Parking Spots
        <FaChevronDown className={`text-xs ml-2 transform transition-transform ${vehicleDropdown ? 'rotate-180' : ''}`} />
      </button>
      {vehicleDropdown && (
        <div className="ml-4 flex flex-col gap-2 mt-1">
          <a href="#" className="text-gray-300 hover:text-white text-sm">Covered</a>
          <a href="#" className="text-gray-300 hover:text-white text-sm">Open</a>
          <a href="#" className="text-gray-300 hover:text-white text-sm">EV-Friendly</a>
        </div>
      )}

      {user && (
        <>
          <a href={`/user/${user.id}`} className="text-gray-200 hover:text-white transition">My Profile</a>
          <a href="#" className="text-gray-200 hover:text-white transition">My Bookings</a>
        </>
      )}
    </>
  );

  return (
    <div className="bg-[#1f2937] text-white shadow-md">
      {/* Top Navbar */}
      <div className="flex justify-between items-center px-4 py-3 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-blue-500">🅿️</div>
          <span className="text-xl font-bold text-white">ParkPro</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinksDesktop}

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search spots"
              className="rounded-full text-sm py-1.5 px-4 pr-10 bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute right-3 top-2.5 text-gray-300 text-sm" />
          </div>

          {/* Login/Logout Button */}
          <button
            onClick={handleLoginLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-4 rounded-md"
          >
            {user ? 'Logout' : 'Login'}
          </button>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden bg-[#1f2937] px-4 pb-4 flex flex-col gap-4">
          {navLinksMobile}

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search spots"
              className="rounded-full text-sm py-1.5 px-4 pr-10 bg-gray-700 text-white placeholder-gray-300 w-full"
            />
            <FaSearch className="absolute right-3 top-2.5 text-gray-300 text-sm" />
          </div>

          {/* Login/Logout Button */}
          <button
            onClick={handleLoginLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-4 rounded-md w-fit"
          >
            {user ? 'Logout' : 'Login'}
          </button>
        </div>
      )}
    </div>
  );
}
