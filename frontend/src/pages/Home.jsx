import { useState } from 'react';
import { fetchData } from '../services/api';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleFetchData = async () => {
    setLoading(true);
    try {
      const result = await fetchData();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Welcome to Vite + React + Tailwind v4.0
      </h1>
      
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        This is a clean starter template with Vite, React, Tailwind CSS v4.0, 
        Axios, and React Router pre-configured for rapid development.
      </p>
      
      <div className="space-y-4">
        <button 
          onClick={handleFetchData}
          disabled={loading}
          className="btn-primary disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Test API Call'}
        </button>
        
        {data && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg max-w-md mx-auto">
            <p className="text-green-800">API Response received!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;