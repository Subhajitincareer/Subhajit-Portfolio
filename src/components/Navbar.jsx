import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const pages = [
    { name: 'About', path: '/' },
    { name: 'Resume', path: '/resume' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="sticky top-0 bg-eerie-black/75 backdrop-blur-lg border-b border-jet rounded-t-2xl z-50">
      <ul className="flex justify-around py-4">
        {pages.map((page) => (
          <li key={page.name}>
            <NavLink
              to={page.path}
              className={({ isActive }) => 
                `px-4 py-2 capitalize ${
                  isActive 
                    ? 'text-orange-yellow' 
                    : 'text-gray-400 hover:text-white'
                } transition`
              }
            >
              {page.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}