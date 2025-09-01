import React from 'react';
import styles from '../page.module.css';

import Hero_gallery from '../../../../../../components/gallery/Hero_gallery';
import ProjectGallery from '../../../../../../components/gallery/ProjectGallery';
import TsuzukitaiTxt from '../../../../../../components/gallery/project_text/TsuzukitaiTxt';

// Enhanced metadata with OpenGraph and Twitter cards
export const metadata = {
  title: 'Tsuzukitai | Corentin Damas Photography',
  description:
    'A photographic journey through contemporary Japanese life and culture. Fine art photography series capturing the essence of modern Japan from 2021-2023.',
  keywords: [
    'japanese photography',
    'street photography',
    'fine art photography',
    'cultural photography',
    'documentary photography',
  ],
  openGraph: {
    title: 'Tsuzukitai | Corentin Damas Photography',
    description: 'A photographic journey through contemporary Japanese life and culture.',
    url: 'https://www.corentindamas.com/gallery/tsuzukitai',
    siteName: 'Corentin Damas Photography',
    images: [
      {
        url: '/tsuzukitai/S/12-tsuzukitai.webp',
        width: 1200,
        height: 630,
        alt: 'Contemporary Japanese street scene with traditional and modern elements.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tsuzukitai | Corentin Damas Photography',
    description: 'A photographic journey through contemporary Japanese life and culture.',
    images: ['/tsuzukitai/S/12-tsuzukitai.webp'],
  },
};

// Structured data for the gallery (JSON-LD)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Tsuzukitai',
  description: 'A photographic journey through contemporary Japanese life and culture.',
  creator: {
    '@type': 'Person',
    name: 'Corentin Damas',
    url: 'https://www.corentindamas.com/about',
  },
  datePublished: '2023-12-01',
  dateModified: '2023-12-01',
  contentLocation: {
    '@type': 'Place',
    name: 'Japan',
  },
  keywords: 'japan, street, cultural, documentary, fine art, photography',
  genre: 'Documentary Photography',
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={styles.page}>
        <Hero_gallery
          title="続きたい (Tsuzukitai)"
          c1="Street"
          c2="2017 - 2018"
          c3="Japan"
          storyContent={<TsuzukitaiTxt />}
        />

        {/* Improved optimized gallery with sharp corners */}
        <ProjectGallery projectDir="tsuzukitai" />
      </div>
    </>
  );
}
