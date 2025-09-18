const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-4">
          This project was created with a custom CLI tool that sets up a modern 
          React development environment with the following technologies:
        </p>
        
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li><strong>Vite</strong> - Fast build tool and dev server</li>
          <li><strong>React</strong> - UI library</li>
          <li><strong>Tailwind CSS v4.0</strong> - Latest utility-first CSS framework</li>
          <li><strong>Axios</strong> - HTTP client for API calls</li>
          <li><strong>React Router</strong> - Client-side routing</li>
        </ul>
        
        <p className="text-gray-600 mt-6">
          The project includes a well-organized folder structure, 
          pre-configured components, and ready-to-use utilities with the latest Tailwind v4.0.
        </p>
      </div>
    </div>
  );
};

export default About;