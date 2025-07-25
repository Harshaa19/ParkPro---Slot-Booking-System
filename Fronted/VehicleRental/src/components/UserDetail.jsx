// components/UserDetail.jsx
import React from 'react';

export default function UserDetail({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-blue-600">{icon}</span>
      <div>
        <p className="text-gray-600 font-medium">{label}</p>
        <p className="text-gray-800">{value}</p>
      </div>
    </div>
  );
}
