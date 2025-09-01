import Image from 'next/image';
import Link from 'next/link';
import styles from './Section_Europe.module.css';

function Section_Europe() {
  return (
    <section className={`${styles.section__eu} content-container`}>
      <div className={styles.section__block}>
        <Link href={'/gallery/morning_shadows'} className={styles.block__img_containeur}>
          <Image
            src="/morning_shadows/L/06-morning_shadows.webp"
            alt="View on the city of london in the morning light"
            className={`${styles.block__img}`}
            width={1280}
            height={853}
            quality={85}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 75vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgwIiBoZWlnaHQ9Ijg1MyIgdmlld0JveD0iMCAwIDEyODAgODUzIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzMzMzIi8+PC9zdmc+"
          />
        </Link>
        <div className={styles.block__legend}>
          <Link href={'/gallery/morning_shadows'}>
            <h2 className={styles.block__legend_txt}> Morning Shadows</h2>
          </Link>
          <div className={styles.verticalRule}></div>
        </div>
      </div>

      <div className={styles.section__block}>
        <Link href={'/gallery/museums'} className={styles.block__img_containeur}>
          <Image
            src="/museums/L/03-museums.webp"
            alt="Entrance of the Natural History Museum of London (UK), statue of Charles Darwin"
            className={`${styles.block__img}`}
            width={1280}
            height={853}
            quality={85}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 75vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgwIiBoZWlnaHQ9Ijg1MyIgdmlld0JveD0iMCAwIDEyODAgODUzIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzMzMzIi8+PC9zdmc+"
          />
        </Link>
        <div className={styles.block__legend}>
          <Link href={'/gallery/museums'}>
            <h2 className={styles.block__legend_txt}>Museums</h2>
          </Link>
          <div className={styles.verticalRule}></div>
        </div>
      </div>
    </section>
  );
}

export default Section_Europe;
