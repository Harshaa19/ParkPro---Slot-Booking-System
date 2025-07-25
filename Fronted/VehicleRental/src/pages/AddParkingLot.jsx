import React, { useState } from 'react';
import AdminDashboard2 from './AdminDashboard2';
import { useAuth } from '../context/AuthContext'; // ✅ Import AuthContext

export default function AddParkingLot() {
  const { user } = useAuth(); // optional, if needed
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    totalCapacity: '',
    vehicleTypes: [],
    rate: '',
    openTime: '',
    closeTime: '',
    status: 'Active',
    notes: '',
    image: null,
  });

  const vehicleOptions = ['Car', 'Bike', 'SUV', 'Van', 'Truck'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else if (type === 'checkbox') {
      const updatedTypes = checked
        ? [...formData.vehicleTypes, value]
        : formData.vehicleTypes.filter((type) => type !== value);
      setFormData({ ...formData, vehicleTypes: updatedTypes });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // ✅ Fix: Get token

    if (!token) {
      alert('Authorization token missing. Please login again.');
      return;
    }

    let imageUrl = '';

    if (formData.image) {
      const imageData = new FormData();
      imageData.append('file', formData.image);
      imageData.append('upload_preset', 'unsigned_preset');

      try {
        const imgRes = await fetch('https://api.cloudinary.com/v1_1/dkcuquwmg/image/upload', {
          method: 'POST',
          body: imageData,
        });

        const imgData = await imgRes.json();
        imageUrl = imgData.secure_url;
      } catch (err) {
        alert('Image upload failed. Please try again.');
        return;
      }
    }

    const payload = {
      ...formData,
      imageUrl,
    };
    delete payload.image;

    try {
      const response = await fetch('http://localhost:8080/api/parking-lots/admin/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Parking lot created successfully!');
        console.log(result);
      } else {
        const errorText = await response.text();
        alert('Error: ' + errorText);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Something went wrong while submitting.');
    }
  };

  return (
    <div className='flex bg-gray-50 min-h-screen'>
      <div className='w-64'>
        <AdminDashboard2 />
      </div>
      <div className='flex-1 p-10'>
        <div className='bg-white shadow rounded-2xl p-10 border border-gray-100'>
          <h2 className='text-3xl font-bold text-blue-700 mb-3'>Create a New Parking Lot</h2>
          <p className='text-sm text-gray-500 mb-8'>Fill in the details below to add a new parking lot to your system.</p>

          <form onSubmit={handleSubmit} className='space-y-8'>
            <div>
              <label className='block text-sm font-semibold mb-2'>Upload a Photo</label>
              <input
                type='file'
                name='image'
                accept='image/*'
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md p-2'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <div>
                <label className='block text-sm font-semibold mb-1'>Name</label>
                <input name='name' value={formData.name} onChange={handleChange} required className='w-full px-4 py-2 rounded-md border border-gray-300' />
              </div>
              <div>
                <label className='block text-sm font-semibold mb-1'>Location</label>
                <input name='location' value={formData.location} onChange={handleChange} required className='w-full px-4 py-2 rounded-md border border-gray-300' />
              </div>
              <div>
                <label className='block text-sm font-semibold mb-1'>Total Capacity</label>
                <input type='number' name='totalCapacity' value={formData.totalCapacity} onChange={handleChange} required className='w-full px-4 py-2 rounded-md border border-gray-300' />
              </div>
              <div>
                <label className='block text-sm font-semibold mb-1'>Vehicle Types Allowed</label>
                <div className='flex flex-wrap gap-3'>
                  {vehicleOptions.map((type) => (
                    <label key={type} className='flex items-center gap-2 text-sm'>
                      <input
                        type='checkbox'
                        name='vehicleTypes'
                        value={type}
                        checked={formData.vehicleTypes.includes(type)}
                        onChange={handleChange}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className='block text-sm font-semibold mb-1'>Rate (per hour)</label>
                <input type='number' name='rate' value={formData.rate} onChange={handleChange} className='w-full px-4 py-2 rounded-md border border-gray-300' />
              </div>
              <div>
                <label className='block text-sm font-semibold mb-1'>Status</label>
                <select name='status' value={formData.status} onChange={handleChange} className='w-full px-4 py-2 rounded-md border border-gray-300'>
                  <option value='Active'>Active</option>
                  <option value='Inactive'>Inactive</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-semibold mb-1'>Open Time</label>
                <input type='time' name='openTime' value={formData.openTime} onChange={handleChange} className='w-full px-4 py-2 rounded-md border border-gray-300' />
              </div>
              <div>
                <label className='block text-sm font-semibold mb-1'>Close Time</label>
                <input type='time' name='closeTime' value={formData.closeTime} onChange={handleChange} className='w-full px-4 py-2 rounded-md border border-gray-300' />
              </div>
            </div>

            <div>
              <label className='block text-sm font-semibold mb-1'>Additional Notes</label>
              <textarea name='notes' rows='3' value={formData.notes} onChange={handleChange} className='w-full px-4 py-2 rounded-md border border-gray-300' placeholder='Any specific notes or instructions...' />
            </div>

            <div className='text-right'>
              <button type='submit' className='bg-blue-600 text-white font-medium px-6 py-2 rounded hover:bg-blue-700 transition'>
                Create Parking Lot
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
