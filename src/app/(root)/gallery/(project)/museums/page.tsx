import React from "react";
import styles from "../page.module.css";

import Hero_gallery from "../../../../../../components/gallery/Hero_gallery";
import ProjectGallery from "../../../../../../components/gallery/ProjectGallery";
import MuseumsTxt from "../../../../../../components/gallery/project_text/MuseumsTxt";
import Project_Story from "../../../../../../components/gallery/Project_Story";

// Enhanced metadata with OpenGraph and Twitter cards
export const metadata = {
  title: "Museums | Corentin Damas Photography",
  description:
    "A photographic exploration of museum spaces and their architectural grandeur. Fine art photography series capturing the intersection of art, architecture, and history from 2019-2023.",
  keywords: [
    "museum photography",
    "architectural photography",
    "fine art photography",
    "cultural photography",
    "interior photography",
  ],
  openGraph: {
    title: "Museums | Corentin Damas Photography",
    description:
      "A photographic exploration of museum spaces and their architectural grandeur.",
    url: "https://www.corentindamas.com/gallery/museums",
    siteName: "Corentin Damas Photography",
    images: [
      {
        url: "/museums/S/12-museums.webp",
        width: 1200,
        height: 630,
        alt: "Grand museum interior with dramatic lighting and architectural details.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Museums | Corentin Damas Photography",
    description:
      "A photographic exploration of museum spaces and their architectural grandeur.",
    images: ["/museums/S/12-museums.webp"],
  },
};

export default function Page() {
  return (
    <div className={styles.page}>
      <Hero_gallery
        title="Museums"
        c1="Architecture"
        c2="2019 - 2023"
        c3="Various"
        storyContent={<MuseumsTxt />}
      />

      {/* Improved optimized gallery with sharp corners */}
      <ProjectGallery projectDir="museums" />
      <div className={styles.story_mobile}>
        <Project_Story txt={<MuseumsTxt />} />
      </div>
    </div>
  );
}
