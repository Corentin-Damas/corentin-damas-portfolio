import React from 'react';
import styles from '../page.module.css';

import Hero_gallery from '../../../../../../components/gallery/Hero_gallery';
import ProjectGallery from '../../../../../../components/gallery/ProjectGallery';
import MorningShadowsTxt from '../../../../../../components/gallery/project_text/MorningShadowsTxt';
import { MetadataRoute } from 'next';

// Enable ISR with a revalidation period of 7 days
export const revalidate = 604800; // 7 days in seconds

// Enhanced metadata with OpenGraph and Twitter cards
export const metadata = {
  title: 'Morning Shadows | Corentin Damas Photography',
  description:
    'A contemplative photography series exploring the interplay of light and shadow in urban environments during early morning hours. Fine art photography from 2018-2023.',
  keywords: [
    'morning photography',
    'urban photography',
    'fine art photography',
    'street photography',
    'light and shadow',
  ],
  openGraph: {
    title: 'Morning Shadows | Corentin Damas Photography',
    description:
      'A contemplative photography series exploring the interplay of light and shadow in urban environments during early morning hours.',
    url: 'https://www.corentindamas.com/gallery/morning_shadows',
    siteName: 'Corentin Damas Photography',
    images: [
      {
        url: '/morning_shadows/S/12-morning_shadows.webp',
        width: 1200,
        height: 630,
        alt: 'Early morning scene with long shadows cast by buildings on an empty street.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Morning Shadows | Corentin Damas Photography',
    description:
      'A contemplative photography series exploring the interplay of light and shadow in urban environments during early morning hours.',
    images: ['/morning_shadows/S/12-morning_shadows.webp'],
  },
};

// Structured data for the gallery (JSON-LD)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Morning Shadows',
  description:
    'A contemplative photography series exploring the interplay of light and shadow in urban environments during early morning hours.',
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
  keywords: 'morning, shadows, urban, street, fine art, photography',
  genre: 'Urban Photography',
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={styles.page}>
        <Hero_gallery
          title="Morning Shadows"
          c1="Urban"
          c2="2018 - 2023"
          c3="Various"
          storyContent={<MorningShadowsTxt />}
        />

        {/* Improved optimized gallery with sharp corners */}
        <ProjectGallery projectDir="morning_shadows" />
      </div>
    </>
  );
}
