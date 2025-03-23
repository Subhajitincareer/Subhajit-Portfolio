import { useState } from 'react';
import { FiMail, FiPhone, FiCalendar, FiMapPin } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside className="w-full lg:w-80 bg-eerie-black rounded-2xl p-6 shadow-xl lg:sticky lg:top-8">
      {/* Avatar Section */}
      <div className="flex flex-col items-center gap-6 mb-8">
        <div className="relative bg-gradient-onyx rounded-2xl p-2 shadow-lg">
          <img 
            src="src/assets/images/io.jpg" 
            alt="Subhajit Pal"
            className="w-32 h-32 rounded-2xl object-cover"
          />
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white mb-2">Subhajit Pal</h1>
          <span className="bg-onyx text-orange-yellow px-4 py-1 rounded-lg text-sm">
            Web Developer
          </span>
        </div>
      </div>

      {/* Expand Button for Mobile */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden w-full bg-gradient-onyx p-3 rounded-lg mb-4 flex items-center justify-between"
      >
        <span className="text-orange-yellow">Show Contacts</span>
        <span className={`text-white transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Contact Information */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="space-y-6">
          {/* Contact Items */}
          <div className="flex items-center gap-4">
            <div className="bg-gradient-onyx p-3 rounded-lg shadow-lg">
              <FiMail className="text-2xl text-orange-yellow" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <a href="mailto:richard@example.com" className="text-white hover:text-orange-yellow transition">
               Subhajitincareer@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gradient-onyx p-3 rounded-lg shadow-lg">
              <FiPhone className="text-2xl text-orange-yellow" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Phone</p>
              <a href="tel:+12133522795" className="text-white hover:text-orange-yellow transition">
               +91 7407089354
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gradient-onyx p-3 rounded-lg shadow-lg">
              <FiCalendar className="text-2xl text-orange-yellow" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Birthday</p>
              <span className="text-white">May 31, 2006</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gradient-onyx p-3 rounded-lg shadow-lg">
              <FiMapPin className="text-2xl text-orange-yellow" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Location</p>
              <span className="text-white">Karimpur, WB</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 border-t border-jet pt-6">
          <div className="flex justify-center gap-4">
            <a href="#" className="text-gray-400 hover:text-orange-yellow transition">
              <FaGithub className="text-2xl" />
            </a>
            <a href="https://www.linkedin.com/in/subhajit-pal-31b30928a/" className="text-gray-400 hover:text-orange-yellow transition">
              <FaLinkedin className="text-2xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-yellow transition">
              <FaTwitter className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}