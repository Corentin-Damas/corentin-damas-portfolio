import styles from './Section_Memories.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Gallery_link_white from '../Links/Gallery_link_white';
//  `grain ${styles.grain_opacity}`

function Section_Memories() {
  return (
    <section className={styles.memories_containeur}>
      <div className={`grain ${styles.grain_opacity}`} aria-hidden="true"></div>
      <div className={styles.memories__left}>
        <div className={`${styles.rule_vl} `}></div>
        <Link href={'gallery/tsuzukitai'}>
          <h2 className={styles.memories__title_main}>続きたい</h2>
        </Link>
        <div className={`${styles.memories__img_container} ${styles.small_screen_img}`}>
          <Link href={'gallery/tsuzukitai'}>
            <Image
              src="/tsuzukitai/L/37-tsuzukitai.webp" 
              alt="Abstract image in black and white of a white fish."
              className={`${styles.memories__img}`}
              width={1280}
              height={853}
              quality={85}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 60vw" // 🚀 OPTIMISATION : Sizes plus précis
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgwIiBoZWlnaHQ9Ijg1MyIgdmlld0JveD0iMCAwIDEyODAgODUzIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyMjIyIi8+PC9zdmc+"
            />
          </Link>
        </div>
        <Link href={'gallery/tsuzukitai'}>
          <h2 className={styles.memories__title_sec}>Trapped Memories</h2>
        </Link>
        <div className={styles.rule_vl}></div>

        <div className={styles.link__containeur}>
          <Gallery_link_white path="/gallery/a_year_in_japan" content="See more" />
        </div>
      </div>
      <div className={`${styles.memories__img_container} ${styles.large_screen_img}`}>
        <Link href={'gallery/tsuzukitai'}>
          <Image
            src="/tsuzukitai/L/37-tsuzukitai.webp" 
            alt="Abstract image in black and white of a white fish."
            className={`${styles.memories__img}`}
            width={1280} 
            height={853}
            quality={85}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 60vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgwIiBoZWlnaHQ9Ijg1MyIgdmlld0JveD0iMCAwIDEyODAgODUzIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyMjIyIi8+PC9zdmc+"
          />
        </Link>
      </div>
    </section>
  );
}

export default Section_Memories;
