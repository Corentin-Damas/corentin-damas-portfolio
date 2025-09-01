import React from 'react';
import styles from '../page.module.css';

import Hero_gallery from '../../../../../../components/gallery/Hero_gallery';
import ProjectGallery from '../../../../../../components/gallery/ProjectGallery';
import EarthAndSkyTxt from '../../../../../../components/gallery/project_text/EarthAndSkyTxt';
import { MetadataRoute } from 'next';

// Enable ISR with a revalidation period of 7 days
export const revalidate = 604800; // 7 days in seconds

// Enhanced metadata with OpenGraph and Twitter cards
export const metadata = {
  title: 'Earth & Sky | Corentin Damas Photography',
  description:
    'A stunning collection of landscape photography capturing the beauty of natural environments and dramatic skies. Fine art photography series from 2017-2023.',
  keywords: [
    'landscape photography',
    'fine art photography',
    'nature photography',
    'sky photography',
    'environmental photography',
  ],
  openGraph: {
    title: 'Earth & Sky | Corentin Damas Photography',
    description:
      'A stunning collection of landscape photography capturing the beauty of natural environments and dramatic skies.',
    url: 'https://www.corentindamas.com/gallery/earth_and_sky',
    siteName: 'Corentin Damas Photography',
    images: [
      {
        url: '/earth_and_sky/S/12-earth_and_sky.webp',
        width: 1200,
        height: 630,
        alt: 'Landscape at sunrise of a valley bathing in pink clouds, in the middle the ruine of a old japanese castle.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Earth & Sky | Corentin Damas Photography',
    description:
      'A stunning collection of landscape photography capturing the beauty of natural environments and dramatic skies.',
    images: ['/earth_and_sky/S/12-earth_and_sky.webp'],
  },
};

// Structured data for the gallery (JSON-LD)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Earth & Sky',
  description:
    'A stunning collection of landscape photography capturing the beauty of natural environments and dramatic skies.',
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
  keywords: 'landscape, nature, sky, environmental, fine art, photography',
  genre: 'Landscape Photography',
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={styles.page}>
        <Hero_gallery
          title="Earth & Sky"
          c1="Landscapes"
          c2="2017 - 2023"
          c3="Various"
          storyContent={<EarthAndSkyTxt />}
        />

        {/* Improved optimized gallery with sharp corners */}
        <ProjectGallery projectDir="earth_and_sky" />
      </div>
    </>
  );
}
