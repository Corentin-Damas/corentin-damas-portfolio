import React from 'react';
import styles from '../page.module.css';

import Hero_gallery from '../../../../../../components/gallery/Hero_gallery';
import ProjectGallery from '../../../../../../components/gallery/ProjectGallery';
import InfraredTxt from '../../../../../../components/gallery/project_text/InfraredTxt';
import { MetadataRoute } from 'next';

// Enable ISR with a revalidation period of 7 days
export const revalidate = 604800; // 7 days in seconds

// Enhanced metadata with OpenGraph and Twitter cards
export const metadata = {
  title: 'World in Infrared | Corentin Damas Photography',
  description:
    'An experimental photography series capturing the world through infrared light, revealing hidden patterns and surreal landscapes. Fine art photography from 2020-2023.',
  keywords: [
    'infrared photography',
    'experimental photography',
    'fine art photography',
    'landscape photography',
    'surreal photography',
  ],
  openGraph: {
    title: 'World in Infrared | Corentin Damas Photography',
    description:
      'An experimental photography series capturing the world through infrared light, revealing hidden patterns and surreal landscapes.',
    url: 'https://www.corentindamas.com/gallery/infrared',
    siteName: 'Corentin Damas Photography',
    images: [
      {
        url: '/infrared/S/12-infrared.webp',
        width: 1200,
        height: 630,
        alt: 'Infrared picture of a field with few Menhir standing up and others on the ground.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'World in Infrared | Corentin Damas Photography',
    description:
      'An experimental photography series capturing the world through infrared light, revealing hidden patterns and surreal landscapes.',
    images: ['/infrared/S/12-infrared.webp'],
  },
};

// Structured data for the gallery (JSON-LD)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'World in Infrared',
  description:
    'An experimental photography series capturing the world through infrared light, revealing hidden patterns and surreal landscapes.',
  creator: {
    '@type': 'Person',
    name: 'Corentin Damas',
    url: 'https://www.corentindamas.com/about',
  },
  datePublished: '2023-12-01',
  dateModified: '2023-12-01',
  contentLocation: {
    '@type': 'Place',
    name: 'Various Locations',
  },
  keywords: 'infrared, experimental, landscape, surreal, fine art, photography',
  genre: 'Experimental Photography',
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={styles.page}>
        <Hero_gallery title="Infrared" c1="Experimental" c2="2020 - 2023" c3="Various" storyContent={<InfraredTxt />} />

        {/* Improved optimized gallery with sharp corners */}
        <ProjectGallery projectDir="infrared" />
      </div>
    </>
  );
}
