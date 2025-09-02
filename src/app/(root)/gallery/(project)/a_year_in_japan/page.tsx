import React from "react";
import styles from "../page.module.css";

import Hero_gallery from "../../../../../../components/gallery/Hero_gallery";
import ProjectGallery from "../../../../../../components/gallery/ProjectGallery";
import YearInJapanTxt from "../../../../../../components/gallery/project_text/YearInJapanTxt";
import Project_Story from "../../../../../../components/gallery/Project_Story";
// Enhanced metadata with OpenGraph and Twitter cards
export const metadata = {
  title: "A Year in Japan | Corentin Damas Photography",
  description:
    "A photographic journey through Japan capturing urban landscapes, cultural moments, and scenic beauty from Tokyo to rural villages. View this fine art photography series shot during 2017-2018.",
  keywords: [
    "Japan photography",
    "street photography Japan",
    "Tokyo photography",
    "Japanese landscapes",
    "fine art photography",
  ],
  openGraph: {
    title: "A Year in Japan | Corentin Damas Photography",
    description:
      "A photographic journey through Japan capturing urban landscapes, cultural moments, and scenic beauty from Tokyo to rural villages.",
    url: "https://www.corentindamas.com/gallery/a_year_in_japan",
    siteName: "Corentin Damas Photography",
    images: [
      {
        url: "/a_year_in_japan/S/02-a_year_in_japan.webp",
        width: 1200,
        height: 630,
        alt: "Night cityscape of Rainbow Bridge in Tokyo, Japan",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A Year in Japan | Corentin Damas Photography",
    description:
      "A photographic journey through Japan capturing urban landscapes, cultural moments, and scenic beauty.",
    images: ["/a_year_in_japan/S/02-a_year_in_japan.webp"],
  },
};

export default function Page() {
  return (
    <div className={styles.page}>
      <Hero_gallery
        title="A Year in Japan"
        c1="Travel"
        c2="2017 - 2018"
        c3="Japan"
        storyContent={<YearInJapanTxt />}
      />
      <ProjectGallery projectDir="a_year_in_japan" />

      <div className={styles.story_mobile}>
        <Project_Story txt={<YearInJapanTxt />} />
      </div>
    </div>
  );
}
