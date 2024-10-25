import React from 'react';
import { createRoot } from 'react-dom/client';

const App: React.FC = () => {
  return (
    <div>
      <h1>Hello, React with TypeScript and Webpack!</h1>
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
