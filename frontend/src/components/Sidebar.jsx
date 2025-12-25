import { useState, useEffect } from "react";
import { FiMail, FiCalendar, FiMapPin } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import io from "../assets/images/io.jpg"; // Fallback image
import api from "../services/api"; // Ensure api service is imported

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const res = await api.get('/auth/portfolio');
        if (res.data.success) {
          setUserData(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error);
      }
    };

    fetchPortfolioData();
  }, []);

  // Helpers for safe access
  const user = userData || {};
  const social = user.socialLinks || {};
  const profileImg = user.profileImage?.url || io;

  return (
    <aside className="w-full lg:w-80 bg-eerie-black rounded-2xl p-6 shadow-xl lg:sticky lg:top-8">
      {/* Avatar Section */}
      <div className="flex flex-col items-center gap-6 mb-8">
        <div className="relative bg-gradient-onyx rounded-2xl p-2 shadow-lg">
          <img
            src={profileImg}
            alt={user.name || "Subhajit Pal"}
            className="w-32 h-32 rounded-2xl object-cover"
            onError={(e) => { e.target.src = io; }} // Fallback on error
          />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white mb-2">
            {user.name || "Subhajit Pal"}
          </h1>
          <span className="bg-onyx text-orange-yellow px-4 py-1 rounded-lg text-sm">
            {user.tag || "Web Developer"}
          </span>
        </div>
      </div>

      {/* Expand Button for Mobile */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden w-full bg-gradient-onyx p-3 rounded-lg mb-4 flex items-center justify-between"
      >
        <span className="text-orange-yellow">Show Contacts</span>
        <span
          className={`text-white transition-transform ${isExpanded ? "rotate-180" : ""
            }`}
        >
          ▼
        </span>
      </button>

      {/* Contact Information */}
      <div className={`${isExpanded ? "block" : "hidden"} lg:block`}>
        <div className="space-y-6">
          {/* Contact Items */}
          <div className="flex items-center gap-4">
            <div className="bg-gradient-onyx p-3 rounded-lg shadow-lg">
              <FiMail className="text-2xl text-orange-yellow" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <a
                href={`mailto:${user.email || 'Subhajitincareer@gmail.com'}`}
                className="text-white hover:text-orange-yellow transition"
              >
                {user.email || 'Subhajitincareer@gmail.com'}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gradient-onyx p-3 rounded-lg shadow-lg">
              <FiCalendar className="text-2xl text-orange-yellow" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Birthday</p>
              <span className="text-white">{user.birthday || 'May 31, 2006'}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gradient-onyx p-3 rounded-lg shadow-lg">
              <FiMapPin className="text-2xl text-orange-yellow" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Location</p>
              <span className="text-white">{user.location || 'Karimpur, WB'}</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 border-t border-jet pt-6">
          <div className="flex justify-center gap-4">
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-yellow transition"
              >
                <FaGithub className="text-2xl" />
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-yellow transition"
              >
                <FaLinkedin className="text-2xl" />
              </a>
            )}
            {social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-yellow transition"
              >
                <FaTwitter className="text-2xl" />
              </a>
            )}
            {/* If no social links exist yet, show defaults or empty? 
                Let's show default placeholders only if data is completely missing to avoid empty look, 
                or just hide them. The logic above hides them if empty string. 
                For User Experience, if it's loading, we might want skeletons, but here we just wait.
            */}
          </div>
        </div>
      </div>
    </aside>
  );
}
