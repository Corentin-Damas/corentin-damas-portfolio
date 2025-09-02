import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../about/page.module.css";

function page() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.heroSection}>
          <h3 className={styles.hero_title}>About</h3>

          <div className={styles.keywords}>
            <p className={`${styles.presentation__sub_txt} body_02`}>
              Wandering
            </p>
            <div className="dot"></div>
            <p className={`${styles.presentation__sub_txt} body_02`}> Travel</p>
            <div className="dot"></div>
            <p className={`${styles.presentation__sub_txt} body_02`}>Culture</p>
          </div>
        </div>
      </header>
      <section className={styles.about__content__container}>
        <div className={styles.about__content__left}>
          <Image
            src="/landingpage/color_headS.webp" // 🚀 OPTIMISATION : WebP au lieu de JPG
            alt="Photography of Corentin Damas author of the website and photographies "
            className={`${styles.imgHeadS}`}
            sizes="(max-width: 768px) 100vw, 50vw" // 🚀 OPTIMISATION : Sizes plus réaliste
            width={720} // 🚀 OPTIMISATION : Dimensions explicites
            height={480}
            quality={85} // 🚀 OPTIMISATION : Qualité optimisée pour WebP
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MjAiIGhlaWdodD0iNDgwIiB2aWV3Qm94PSIwIDAgNzIwIDQ4MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y4ZmFmYyIvPjwvc3ZnPg=="
          />
        </div>
        <article className={styles.about__content__right}>
          <p>
            &emsp; French photographer based in{" "}
            <span className={styles.special}>Cagliari, Italy</span> , working as
            a Freelancer since 2019. Thanks to my training at the french
            photograpic school of Speos ( Paris, London ) in photojournalism and
            studio I&apos;m versatile. Most of the time I&apos;m working on
            project set by clients that can end by the creation of photobooks
            and displays on walls. <br />
            <br />
            &emsp; I&apos;ve also been lecturing and speaker in photo Club,
            particulary in my hometown photo club &quot;Contraste&quot; in
            Vannes, France. We created exhibition and workshops on various
            photographic themes and lectures about photographic theories,
            building and thinking projects and general photographic knowledge.
            We got the chance to be exhibited in: <br />
            - 2019: The castle of &quot;l&apos;hermine&quot; in Vannes, France /
            <br />
            - 2020: At Vannes festival photo in Vannes, France /<br />
          </p>
          <Link
            href={"/gallery"}
            className={`${styles.about__link} gallery_Link`}
          >
            See Gallery <span className={styles.special}> _&gt;</span>
          </Link>
        </article>
      </section>
    </>
  );
}

export default page;
