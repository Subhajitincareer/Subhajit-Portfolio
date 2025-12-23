import { Link, useLocation } from 'react-router-dom';
import {
    FaHome,
    FaProjectDiagram,
    FaBlog,
    FaEnvelope,
    FaSignOutAlt,
    FaBars,
    FaTimes
} from 'react-icons/fa';
import useAuthStore from '../../store/useAuthStore';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSidebar = () => {
    const location = useLocation();
    const { logout } = useAuthStore();
    const [isOpen, setIsOpen] = useState(true);

    const menuItems = [
        { path: '/admin', name: 'Dashboard', icon: <FaHome /> },
        { path: '/admin/projects', name: 'Projects', icon: <FaProjectDiagram /> },
        { path: '/admin/blogs', name: 'Blogs', icon: <FaBlog /> },
        { path: '/admin/messages', name: 'Messages', icon: <FaEnvelope /> },
    ];

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-onyx text-white rounded-lg"
            >
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Sidebar Container */}
            <motion.div
                className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-eerie-black border-r border-onyx flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    }`}
            >
                {/* Logo/Brand */}
                <div className="p-6 border-b border-onyx">
                    <h2 className="text-2xl font-bold text-orange-yellow bg-clip-text text-transparent bg-gradient-to-r from-orange-yellow to-vegas-gold">
                        Admin Panel
                    </h2>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${location.pathname === item.path
                                    ? 'bg-orange-yellow/20 text-orange-yellow shadow-lg shadow-orange-yellow/10'
                                    : 'text-gray-400 hover:bg-onyx hover:text-white'
                                }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                {/* User Profile & Logout */}
                <div className="p-4 border-t border-onyx">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    >
                        <FaSignOutAlt className="text-xl" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </motion.div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default AdminSidebar;
