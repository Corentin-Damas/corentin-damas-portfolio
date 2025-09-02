import React from "react";
import styles from "../page.module.css";

import Hero_gallery from "../../../../../../components/gallery/Hero_gallery";
import ProjectGallery from "../../../../../../components/gallery/ProjectGallery";
import BlackAndWhiteTxt from "../../../../../../components/gallery/project_text/BlackAndWhiteTxt";
import Project_Story from "../../../../../../components/gallery/Project_Story";
// Enhanced metadata with OpenGraph and Twitter cards
// export const metadata = {
//   title: "Black & White Photography | Corentin Damas Photography",
//   description:
//     "A collection of timeless black and white photographs capturing architectural details, urban landscapes, and cultural moments. Fine art photography series from 2015-2023.",
//   keywords: [
//     "black and white photography",
//     "fine art photography",
//     "architectural photography",
//     "urban photography",
//     "monochrome",
//   ],
//   openGraph: {
//     title: "Black & White Photography | Corentin Damas Photography",
//     description:
//       "A collection of timeless black and white photographs capturing architectural details, urban landscapes, and cultural moments.",
//     url: "https://www.corentindamas.com/gallery/black_and_white",
//     siteName: "Corentin Damas Photography",
//     images: [
//       {
//         url: "/black_and_white/S/12-black_and_white.webp",
//         width: 1200,
//         height: 630,
//         alt: "Picture in black and white of the inside of a ruine of a Church.",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Black & White Photography | Corentin Damas Photography",
//     description:
//       "A collection of timeless black and white photographs capturing architectural details, urban landscapes, and cultural moments.",
//     images: ["/black_and_white/S/12-black_and_white.webp"],
//   },
// };

export default function Page() {
  return (
    <div className={styles.page}>
      <Hero_gallery
        title="Black & White"
        c1="Film"
        c2="2015 - 2023"
        c3="Various"
        storyContent={<BlackAndWhiteTxt />}
      />
      <ProjectGallery projectDir="black_and_white" />
      <div className={styles.story_mobile}>
        <Project_Story txt={<BlackAndWhiteTxt />} />
      </div>
    </div>
  );
}
