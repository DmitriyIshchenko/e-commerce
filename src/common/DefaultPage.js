import React from 'react';
import { Link } from 'react-router-dom';

export default function DefaultPage() {
  return (
    <main>
      <h2>page not found!</h2>
      <Link to="/">back to shop</Link>
    </main>
  );
}
