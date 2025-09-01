import Link from 'next/link';
import Image from 'next/image';
import styles from './Section_Japan.module.css';
import Gallery_link from '../Links/Gallery_link';

function Section_Japan() {
  return (
    <section className={`${styles.japan__grid} content-container`}>
      <div className={styles.transparency}></div>
      <Link href={'/gallery/a_year_in_japan'} className={styles.japan__link_containeur}>
        <Image
          src="/a_year_in_japan/L/01-a_year_in_japan.webp" // 🚀 OPTIMISATION : WebP au lieu de JPG
          alt="Couples sitting by the Kamo River at night Kyoto, Japan"
          className={`${styles.japan__img} dark_mode_only`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 60vw" // 🚀 OPTIMISATION : Sizes plus précis
          width={1280}
          height={853}
          quality={85} // 🚀 OPTIMISATION : Qualité légèrement augmentée pour WebP
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgwIiBoZWlnaHQ9Ijg1MyIgdmlld0JveD0iMCAwIDEyODAgODUzIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyMjIyIi8+PC9zdmc+"
        />

        <Image
          src="/a_year_in_japan/L/24-a_year_in_japan.webp" // 🚀 OPTIMISATION : WebP au lieu de JPG
          alt="View on the arbor of Kobe (Japan) with his landmark: the red kobe port tower"
          className={`${styles.japan__img} ${styles.japan__img_position} light_mode_only`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 60vw" // 🚀 OPTIMISATION : Sizes plus précis
          width={1280}
          height={853}
          quality={85} // 🚀 OPTIMISATION : Qualité légèrement augmentée pour WebP
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgwIiBoZWlnaHQ9Ijg1MyIgdmlld0JveD0iMCAwIDEyODAgODUzIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmYWZjIi8+PC9zdmc+"
        />
      </Link>

      <div className={styles.japan__kanji}>
        <h1 className={styles.kanji_middle}>北</h1>
      </div>

      <div className={styles.title__box}>
        <h1 className={`${styles.title__box_mobile}`}>A year in japan</h1>
        <h1 className={`${styles.title__box_txt} ${styles.title__box_line01} `}>A year</h1>

        <h1 className={`${styles.title__box_txt} ${styles.title__box_line02} `}>In</h1>
        <div className={styles.title__box_line}></div>

        <h1 className={` ${styles.title__box_txt} ${styles.title__box_L3} `}>Japan</h1>

        <div className={styles.link__containeur}>
          <Gallery_link path="/gallery/a_year_in_japan" content="Gallery" />
        </div>
      </div>

    </section>
  );
}

export default Section_Japan;
