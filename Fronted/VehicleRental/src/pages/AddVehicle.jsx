import React, { useState } from 'react';
import AdminDashboard2 from './AdminDashboard2';

export default function AddVehicle() {
  const [formData, setFormData] = useState({
    vehicleType: '',
    brand: '',
    model: '',
    year: '',
    price: '',
    category: '',
    transmission: '',
    fuelType: '',
    seatingCapacity: '',
    location: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = '';

    // 🔁 Upload image to Cloudinary
    if (formData.image) {
      const imageData = new FormData();
      imageData.append('file', formData.image);
      imageData.append('upload_preset', 'unsigned_preset'); // 👈 your Cloudinary preset

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

    // 🚀 Send data to backend
    const bodyParams = new URLSearchParams({
      vehicleType: formData.vehicleType,
      brand: formData.brand,
      model: formData.model,
      year: formData.year,
      price: formData.price,
      category: formData.category,
      transmission: formData.transmission,
      fuelType: formData.fuelType,
      seatingCapacity: formData.seatingCapacity,
      location: formData.location,
      description: formData.description,
      imageUrl: imageUrl,
    });

    try {
      const response = await fetch('http://localhost:8080/api/vehicles/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyParams,
      });

      if (response.ok) {
        const result = await response.json();
        alert('Vehicle listed successfully!');
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
    <div className='flex'>
      <div className='w-64'>
        <AdminDashboard2 />
      </div>
      <div className='p-6 md:p-10 max-w-5xl mx-auto'>
        <h2 className='text-3xl font-bold mb-2'>Add New Vehicle</h2>
        <p className='text-gray-500 mb-6'>
          Fill in the details to list a vehicle for booking – including pricing, location, and specifications.
        </p>

        <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow p-6 space-y-6' encType='multipart/form-data'>
          <div>
            <label className='block font-medium text-gray-700 mb-1'>Upload a picture of your vehicle</label>
            <input
              type='file'
              name='image'
              accept='image/*'
              onChange={handleChange}
              className='border border-gray-300 rounded p-2 w-full'
            />
          </div>

          <div className='grid md:grid-cols-2 gap-4'>
            <div>
              <label className='block font-medium'>Vehicle Type</label>
              <select
                name='vehicleType'
                value={formData.vehicleType}
                onChange={handleChange}
                className='w-full border border-gray-300 p-2 rounded'
              >
                <option value=''>Select vehicle type</option>
                <option value='Car'>Car</option>
                <option value='Bike'>Bike</option>
                <option value='Van'>Van</option>
                <option value='SUV'>SUV</option>
                <option value='Truck'>Truck</option>
              </select>
            </div>

            <div>
              <label className='block font-medium'>Brand</label>
              <input
                name='brand'
                type='text'
                placeholder='e.g. BMW, Audi'
                value={formData.brand}
                onChange={handleChange}
                className='w-full border border-gray-300 p-2 rounded'
              />
            </div>

            <div>
              <label className='block font-medium'>Model</label>
              <input
                name='model'
                type='text'
                placeholder='e.g. X5, M4'
                value={formData.model}
                onChange={handleChange}
                className='w-full border border-gray-300 p-2 rounded'
              />
            </div>

            <div>
              <label className='block font-medium'>Year</label>
              <input
                name='year'
                type='number'
                value={formData.year}
                onChange={handleChange}
                className='w-full border border-gray-300 p-2 rounded'
              />
            </div>

            <div>
              <label className='block font-medium'>Daily Price ($)</label>
              <input
                name='price'
                type='number'
                value={formData.price}
                onChange={handleChange}
                className='w-full border border-gray-300 p-2 rounded'
              />
            </div>

            <div>
              <label className='block font-medium'>Category</label>
              <select
                name='category'
                value={formData.category}
                onChange={handleChange}
                className='w-full border border-gray-300 p-2 rounded'
              >
                <option value=''>Select category</option>
                <option value='SUV'>SUV</option>
                <option value='Sedan'>Sedan</option>
                <option value='Hatchback'>Hatchback</option>
                <option value='Cruiser'>Cruiser</option>
                <option value='Sport'>Sport</option>
              </select>
            </div>

            <div>
              <label className='block font-medium'>Transmission</label>
              <select
                name='transmission'
                value={formData.transmission}
                onChange={handleChange}
                className='w-full border border-gray-300 p-2 rounded'
              >
                <option value=''>Select transmission</option>
                <option value='Automatic'>Automatic</option>
                <option value='Manual'>Manual</option>
                <option value='Semi-Automatic'>Semi-Automatic</option>
              </select>
            </div>

            <div>
              <label className='block font-medium'>Fuel Type</label>
              <select
                name='fuelType'
                value={formData.fuelType}
                onChange={handleChange}
                className='w-full border border-gray-300 p-2 rounded'
              >
                <option value=''>Select fuel type</option>
                <option value='Petrol'>Petrol</option>
                <option value='Diesel'>Diesel</option>
                <option value='Electric'>Electric</option>
                <option value='Hybrid'>Hybrid</option>
              </select>
            </div>

            <div>
              <label className='block font-medium'>Seating Capacity</label>
              <input
                name='seatingCapacity'
                type='number'
                value={formData.seatingCapacity}
                onChange={handleChange}
                className='w-full border border-gray-300 p-2 rounded'
              />
            </div>

            <div className='md:col-span-2'>
              <label className='block font-medium'>Location</label>
              <select
                name='location'
                value={formData.location}
                onChange={handleChange}
                className='w-full border border-gray-300 p-2 rounded'
              >
                <option value=''>Select location</option>
                <option value='New York'>New York</option>
                <option value='Los Angeles'>Los Angeles</option>
                <option value='San Francisco'>San Francisco</option>
              </select>
            </div>

            <div className='md:col-span-2'>
              <label className='block font-medium'>Description</label>
              <textarea
                name='description'
                rows='4'
                value={formData.description}
                onChange={handleChange}
                className='w-full border border-gray-300 p-2 rounded'
                placeholder='e.g. A luxurious SUV with a powerful engine and spacious interior...'
              ></textarea>
            </div>
          </div>

          <div className='text-right'>
            <button
              type='submit'
              className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition'
            >
              List Your Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
