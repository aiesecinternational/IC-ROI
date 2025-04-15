// GIDTeam.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const GIDTeam = () => {
  return (
    <div>
      <h1>GID Team</h1>
      <p>This is the GID Team page.</p>
      <Link
        to="/" // Navigate back to the home page
        className="text-blue-600 hover:underline mt-1 block text-sm"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default GIDTeam;