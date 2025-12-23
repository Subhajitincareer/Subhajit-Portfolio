import useAuthStore from '../../store/useAuthStore';
import { motion } from 'framer-motion';
import AdminSidebar from '../../components/Admin/AdminSidebar';

const Dashboard = () => {
    const { user } = useAuthStore();

    return (
        <div className="flex min-h-screen bg-smoky-black text-white font-sans">
            <AdminSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 md:ml-0">

                {/* Mobile Header Spacer (optional, if header is sticky) */}
                {/* <div className="h-16 md:hidden"></div>  */}

                <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full max-w-[1600px] mx-auto">
                    <header className="mb-8">
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-yellow to-vegas-gold">
                            Dashboard Overview
                        </h1>
                    </header>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {/* Stats Cards */}
                        <div className="bg-eerie-black/50 backdrop-blur-sm p-6 rounded-2xl border border-onyx hover:border-orange-yellow/50 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Total Projects</p>
                                    <h3 className="text-3xl font-bold text-white">12</h3>
                                </div>
                                <div className="p-3 bg-orange-yellow/10 rounded-xl text-orange-yellow group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                </div>
                            </div>
                            <div className="w-full bg-onyx rounded-full h-1.5">
                                <div className="bg-orange-yellow h-1.5 rounded-full" style={{ width: '70%' }}></div>
                            </div>
                        </div>

                        <div className="bg-eerie-black/50 backdrop-blur-sm p-6 rounded-2xl border border-onyx hover:border-orange-yellow/50 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Total Blogs</p>
                                    <h3 className="text-3xl font-bold text-white">25</h3>
                                </div>
                                <div className="p-3 bg-vegas-gold/10 rounded-xl text-vegas-gold group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                </div>
                            </div>
                            <div className="w-full bg-onyx rounded-full h-1.5">
                                <div className="bg-vegas-gold h-1.5 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>

                        <div className="bg-eerie-black/50 backdrop-blur-sm p-6 rounded-2xl border border-onyx hover:border-orange-yellow/50 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">New Messages</p>
                                    <h3 className="text-3xl font-bold text-white">5</h3>
                                </div>
                                <div className="p-3 bg-white/10 rounded-xl text-white group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                            </div>
                            <div className="w-full bg-onyx rounded-full h-1.5">
                                <div className="bg-white/80 h-1.5 rounded-full" style={{ width: '15%' }}></div>
                            </div>
                        </div>

                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
