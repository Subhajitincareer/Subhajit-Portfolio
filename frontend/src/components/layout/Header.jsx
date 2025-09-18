import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary-600">
            My App
          </Link>
          
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;