import React from 'react';
import { Link } from 'react-router-dom';

export default function Energy(props) {
  console.log('Energy', props);

  return (
    <div>
      <h1>Energy</h1>
      <Link to="/setting">setting</Link>
    </div>
  );
}
