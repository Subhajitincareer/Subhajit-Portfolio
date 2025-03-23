import { motion } from 'framer-motion';
import { ContactForm, MapEmbed} from '../common';

export default function Contact() {
  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-eerie-black rounded-2xl p-8 shadow-xl"
    >
      <header className="mb-8">
        <h2 className="text-3xl font-semibold text-white pb-4 border-b border-jet">
          Get in Touch
        </h2>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        <ContactForm />
        <MapEmbed />
      </div>
    </motion.article>
  );
}