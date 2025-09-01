import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>⚠️ Page non trouvée</h1>
        <p>Désolé, la page que vous recherchez n'existe pas.</p>
        <Link href="/" className="home-link">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
