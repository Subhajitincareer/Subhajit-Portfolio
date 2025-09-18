import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectFilter, ProjectGrid } from '../common';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', 'web', 'mobile', 'design'];

  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-eerie-black rounded-2xl p-8 shadow-xl"
    >
      <header className="mb-8">
        <h2 className="text-3xl font-semibold text-white pb-4 border-b border-jet">
          My Portfolio
        </h2>
      </header>

      <ProjectFilter 
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <ProjectGrid filter={selectedCategory} />
    </motion.article>
  );
}