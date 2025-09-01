import React from 'react';
import styles from '../page.module.css';

import Hero_gallery from '../../../../../../components/gallery/Hero_gallery';
import ProjectGallery from '../../../../../../components/gallery/ProjectGallery';
import MuseumsTxt from '../../../../../../components/gallery/project_text/MuseumsTxt';
import { MetadataRoute } from 'next';

// Enable ISR with a revalidation period of 7 days
export const revalidate = 604800; // 7 days in seconds

// Enhanced metadata with OpenGraph and Twitter cards
export const metadata = {
  title: 'Museums | Corentin Damas Photography',
  description:
    'A photographic exploration of museum spaces and their architectural grandeur. Fine art photography series capturing the intersection of art, architecture, and history from 2019-2023.',
  keywords: [
    'museum photography',
    'architectural photography',
    'fine art photography',
    'cultural photography',
    'interior photography',
  ],
  openGraph: {
    title: 'Museums | Corentin Damas Photography',
    description: 'A photographic exploration of museum spaces and their architectural grandeur.',
    url: 'https://www.corentindamas.com/gallery/museums',
    siteName: 'Corentin Damas Photography',
    images: [
      {
        url: '/museums/S/12-museums.webp',
        width: 1200,
        height: 630,
        alt: 'Grand museum interior with dramatic lighting and architectural details.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Museums | Corentin Damas Photography',
    description: 'A photographic exploration of museum spaces and their architectural grandeur.',
    images: ['/museums/S/12-museums.webp'],
  },
};

// Structured data for the gallery (JSON-LD)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Museums',
  description: 'A photographic exploration of museum spaces and their architectural grandeur.',
  creator: {
    '@type': 'Person',
    name: 'Corentin Damas',
    url: 'https://www.corentindamas.com/about',
  },
  datePublished: '2023-12-01',
  dateModified: '2023-12-01',
  contentLocation: {
    '@type': 'Place',
    name: 'Various Museums',
  },
  keywords: 'museums, architecture, cultural, interior, fine art, photography',
  genre: 'Architectural Photography',
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={styles.page}>
        <Hero_gallery title="Museums" c1="Architecture" c2="2019 - 2023" c3="Various" storyContent={<MuseumsTxt />} />

        {/* Improved optimized gallery with sharp corners */}
        <ProjectGallery projectDir="museums" />
      </div>
    </>
  );
}
