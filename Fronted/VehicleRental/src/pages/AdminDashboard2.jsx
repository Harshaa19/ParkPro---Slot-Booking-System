import React, { useState } from 'react';
import { FaBars, FaPlus, FaCar, FaClipboardList, FaThLarge } from 'react-icons/fa';
import { LogOut } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AdminDashboard2() {
  const { hrId } = useParams();
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaThLarge />, path: '/admin/dashboard' },
    { id: 'add', label: 'Add Car', icon: <FaPlus />, path: '/admin/add-vehicle' },
    { id: 'manage', label: 'Manage Vehicles', icon: <FaCar />, path: '/admin/manage-vehicles' },
    { id: 'bookings', label: 'Manage Bookings', icon: <FaClipboardList />, path: `/hr-admin/${hrId}/bookings` },
  ];

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <aside className="w-64 bg-white h-screen shadow-md flex flex-col justify-between">
      {/* Profile */}
      <div>
        <div className="flex flex-col items-center pt-6">
          <img src="https://i.pravatar.cc/15" alt="Admin" className="rounded-full w-16 h-16" />
          <h2 className="mt-2 text-sm font-semibold">Harsha</h2>
        </div>

        {/* Nav Links */}
        <nav className="mt-8 px-4 space-y-1">
          {navItems.map(item => (
            <div
              key={item.id}
              onClick={() => {
                setActive(item.id);
                navigate(item.path);
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer text-sm font-medium 
                ${active === item.id ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <div className={`p-1.5 rounded ${active === item.id ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>
                {item.icon}
              </div>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-gray-700 hover:text-red-600 text-sm"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
