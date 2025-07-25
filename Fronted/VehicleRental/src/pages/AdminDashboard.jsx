import { Link, useParams } from 'react-router-dom';
import AdminDashboard2 from './AdminDashboard2';

const AdminDashboard = () => {
  return (
     <div className="flex min-h-screen bg-gray-100">
        <AdminDashboard2/>
        <main className="flex-1 ml-64 p-8  min-h-screen">
          <h1 className="text-3xl font-bold text-gray mb-6">Welcome, Admin </h1>
          <p className=" text-gray-600 text-lg">
                Use the menu on the left to manage your data.
            </p>
        </main>
      </div>
  );
};

export default AdminDashboard;
