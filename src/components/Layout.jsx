import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-black text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar />
          <main className="flex-1">
            <Navbar />
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}