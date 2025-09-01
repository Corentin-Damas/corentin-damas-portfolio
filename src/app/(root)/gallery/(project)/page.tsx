import React from "react";

import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";
import Hero_gallery from "../../../../../components/gallery/Hero_gallery";

function Page() {
  const galleryProjects = [
    {
      projectName: "Trapped memories",
      number: "1",
      keyName: "tsuzukitai",
      pathTo: "/gallery/tsuzukitai",
      source: "/tsuzukitai/S/10-tsuzukitai.webp",
      altTxt: "Deer head in a blurry badckground.",
    },
    {
      projectName: "A year in japan",
      number: "2",
      keyName: "a_year_in_japan",
      pathTo: "/gallery/a_year_in_japan",
      source: "/a_year_in_japan/S/02-a_year_in_japan.webp",
      altTxt:
        "Night cityscape of a Bridge named rainbow Bridge from Tokyo, Japan.",
    },
    {
      projectName: "Morning shadows",
      number: "3",
      keyName: "shadows",
      pathTo: "/gallery/morning_shadows",
      source: "/morning_shadows/S/20-morning_shadows.webp",
      altTxt:
        "Rush hour on London bridge, shadows of people going toward the city.",
      altClass: styles.projectPreview__shadows,
    },
    {
      projectName: "Museums",
      number: "4",
      keyName: "museums",
      pathTo: "/gallery/museums",
      source: "/museums/S/02-museums.webp",
      altTxt:
        "Visitors in form of the painting called the Night Watch from Rembrandt in the rijksmuseum, Amsterdam, Netherlands.",
    },
    {
      projectName: "Earth & sky",
      number: "5",
      keyName: "earth_and_sky",
      pathTo: "/gallery/earth_and_sky",
      source: "/earth_and_sky/S/12-earth_and_sky.webp",
      altTxt:
        "Landscape at sunrise of a valley bathing in pink clouds, in the middle the ruine of a old japanese castle.",
      altClass: styles.projectPreview__landscape,
    },
    {
      projectName: "World in Infrared",
      number: "6",
      keyName: "infrared",
      pathTo: "/gallery/infrared",
      source: "/infrared/S/12-infrared.webp",
      altTxt:
        "Infrared picture of a field with few Menhir standing up and others on the ground.",
    },
    {
      projectName: "Black & white",
      number: "7",
      keyName: "black_and_white",
      pathTo: "/gallery/black_and_white",
      source: "/black_and_white/S/12-black_and_white.webp",
      altTxt:
        "Picture in black and white of the inside of a ruine of a Church.",
    },
  ];
  // page
  return (
    <section className={styles.projects}>
      <Hero_gallery title="Index" c1="Projects" c2="Side works" c3="Explore" />

      <div className={styles.projects__grid}>
        {galleryProjects.map((el) => (
          <Link
            key={el.keyName}
            href={el.pathTo}
            className={`${styles.project__container}`}
          >
            <div className={styles.image__container}>

            <Image
              src={el.source}
              alt={el.altTxt}
              width={600}
              height={0}
              quality={80}
              // fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className={`${el?.altClass} ${styles.project__img}`}
              />
            </div>
            <h5 className={styles.project__title}>
              _{el.number} | {el.projectName}
            </h5>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Page;
