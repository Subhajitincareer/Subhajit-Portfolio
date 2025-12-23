// ProjectFilter.jsx
import { motion } from "motion/react"
import { getFilteredProjects, } from "../../utils/data";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
export const ProjectFilter = ({ categories, selected, onSelect }) => (
  <div className="mb-8 flex flex-wrap gap-4">
    {categories.map(category => (
      <button
        key={category}
        onClick={() => onSelect(category)}
        className={`px-4 py-2 rounded-lg capitalize ${selected === category
          ? 'bg-gradient-yellow text-smoky-black'
          : 'bg-jet text-gray-400 hover:bg-vegas-gold'
          } transition-colors`}
      >
        {category}
      </button>
    ))}
  </div>
);

// ProjectGrid.jsx
export const ProjectGrid = ({ filter }) => {
  const filteredProjects = getFilteredProjects(filter);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map(project => (
        <div key={project.id} className="group relative overflow-hidden rounded-xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-transparent p-4 flex items-end">
            <div>
              <h3 className="text-white text-lg font-semibold">{project.title}</h3>
              <p className="text-vegas-gold text-sm capitalize">{project.category}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};



export const ContactForm = () => {
  const formRef = useRef();
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus({ type: '', message: '' });

    // Use environment variables or fallback to the provided keys
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_pysfons';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_d5yzhfc';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YjG2ML82G4rMz-3F7';

    emailjs
      .sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      )
      .then(
        (result) => {
          console.log('Email successfully sent!', result.text);
          setStatus({ type: 'success', message: 'Message sent successfully!' });
          formRef.current.reset();
        },
        (error) => {
          console.error('Error sending email:', error.text);
          setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {status.message && (
        <div className={`p-4 rounded-lg text-sm ${status.type === 'success'
          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
          : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
          {status.message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <input
          type="text"
          name="user_name"
          placeholder="Name"
          required
          className="w-full p-3 rounded-lg bg-jet border border-onyx focus:border-orange-yellow focus:ring-1 focus:ring-orange-yellow outline-none text-white transition-all placeholder-gray-500"
        />
        <input
          type="email"
          name="user_email"
          placeholder="Email"
          required
          className="w-full p-3 rounded-lg bg-jet border border-onyx focus:border-orange-yellow focus:ring-1 focus:ring-orange-yellow outline-none text-white transition-all placeholder-gray-500"
        />
      </div>
      <textarea
        name="message"
        placeholder="Message"
        rows="5"
        required
        className="w-full p-3 rounded-lg bg-jet border border-onyx focus:border-orange-yellow focus:ring-1 focus:ring-orange-yellow outline-none text-white transition-all placeholder-gray-500 resize-none"
      ></textarea>
      <button
        type="submit"
        disabled={isSending}
        className="w-full py-3 bg-gradient-yellow text-smoky-black rounded-lg font-semibold hover:opacity-90 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
      >
        {isSending ? (
          <>
            <span className="w-5 h-5 border-2 border-smoky-black/30 border-t-smoky-black rounded-full animate-spin"></span>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
};



// TestimonialCard.jsx
export const TestimonialCard = ({ avatar, name, role, text }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 rounded-xl bg-gradient-onyx relative before:absolute before:inset-px before:bg-eerie-black before:rounded-xl"
  >
    <div className="flex items-start gap-4 mb-4">
      <div className="bg-gradient-onyx p-2 rounded-full shadow-lg">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
      <div>
        <h3 className="text-white font-semibold">{name}</h3>
        <p className="text-vegas-gold text-sm">{role}</p>
      </div>
    </div>
    <p className="text-gray-400 leading-relaxed">"{text}"</p>
  </motion.div>
);
// ClientLogos.jsx
export const ClientLogos = () => (
  <div className="mt-8 border-t border-jet pt-6">
    <h3 className="text-white text-lg font-semibold mb-4">Trusted By</h3>
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="p-3 bg-jet rounded-lg flex items-center justify-center"
        >
          <img
            src={`/assets/images/logo-${i}-color.png`}
            alt={`Client ${i}`}
            className="h-8 object-contain grayscale hover:grayscale-0 transition-all"
          />
        </div>
      ))}
    </div>
  </div>
);

// Fix default marker icons
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;



export const MapEmbed = () => (
  <div className="h-96 w-full rounded-xl overflow-hidden shadow-lg">
    <MapContainer
      center={[23.9703, 88.6270]} // Karimpur, WB coordinates
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[23.9703, 88.6270]}>
        <Popup>
          My Location <br /> Karimpur, WB
        </Popup>
      </Marker>
    </MapContainer>
  </div>
);

export const BlogPostCard = ({ image, category, title, date, excerpt }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-eerie-black rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
  >
    <div className="relative h-48">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      <span className="absolute top-4 left-4 bg-jet text-vegas-gold px-3 py-1 rounded-full text-sm">
        {category}
      </span>
    </div>

    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white text-xl font-semibold">{title}</h3>
        <span className="text-gray-400 text-sm">{date}</span>
      </div>
      <p className="text-gray-400 leading-relaxed">{excerpt}</p>
    </div>
  </motion.div>
);