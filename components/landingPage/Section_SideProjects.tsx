import styles from './Section_SideProjects.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Gallery_link from '../Links/Gallery_link';

function Section_SideProjects() {
  return (
    <div className='content-container'>
      <div className={styles.projects}>
        <div className={styles.containeur_project}>
          <Link href={'/gallery/earth_and_sky'} className={`${styles.imgLink_containeur} ${styles.earth_container}`}>
            <Image
              src="/earth_and_sky/L/13-earth_and_sky.webp"
              alt="Photography of a Beach with a natural rock arch at night time"
              className={`${styles.project__img}`}
              width={1280}
              height={853}
              quality={80}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgwIiBoZWlnaHQ9Ijg1MyIgdmlld0JveD0iMCAwIDEyODAgODUzIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTExMTExIi8+PC9zdmc+"
            />
          </Link>
          <div className={`${styles.project__legend_container} `}>
            <Link href={'/gallery/earth_and_sky'}>
              <span className={styles.legend_txt}>Between earth and sky</span>
            </Link>
            <div className={styles.verticalRule}></div>
          </div>
        </div>

        <div className={styles.containeur_project}>
          <Link href={'/gallery/infrared'} className={`${styles.imgLink_containeur} `}>
            <Image
              src="/infrared/L/01-infrared.webp"
              alt="Infrared photoghaphy of a tree near the sea. The tree has pink leaves "
              className={`${styles.project__img}`}
              width={1280}
              height={853}
              quality={80}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgwIiBoZWlnaHQ9Ijg1MyIgdmlld0JveD0iMCAwIDEyODAgODUzIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjlkN2RkIi8+PC9zdmc+"
            />
          </Link>
          <div className={`${styles.project__legend_container} ${styles.infra_legend}`}>
            <Link href={'/gallery/infrared'}>
              <span className={styles.legend_txt}>World in Infrared</span>
            </Link>
            <div className={styles.verticalRule}></div>
          </div>
        </div>

        <div className={styles.containeur_project}>
          <Link
            href={'/gallery/black_and_white'}
            className={`${styles.imgLink_containeur}`}
          >
            <Image
              src="/black_and_white/L/02-black_and_white.webp"
              alt="Black and white photography with three trunk in the snow in front of a beach and the sea"
              className={`${styles.project__img}`}
              width={1280}
              height={853}
              quality={80}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgwIiBoZWlnaHQ9Ijg1MyIgdmlld0JveD0iMCAwIDEyODAgODUzIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+"
            />
          </Link>
          <div className={`${styles.project__legend_container} ${styles.bandwhite_legend}`}>
            <Link href={'/gallery/black_and_white'}>
              <span className={styles.legend_txt}>Black and White</span>
            </Link>
            <div className={styles.verticalRule}></div>
          </div>
        </div>

      </div>
      <div className={styles.link_containeur}>
        <Gallery_link path="/gallery" content="See more projects" />
      </div>
    </div>
  );
}

export default Section_SideProjects;
