import styles from './Section_Contact.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Gallery_link from '../Links/Gallery_link';

function Section_Contact() {
  return (
    <section className={`${styles.contactSection} content-container`}>
      <h6 className={styles.contactSection__label}>Photographer</h6>

      <div className={styles.contactSection__presentation}>
        <h5 className={styles.presentation__name}>Corentin Damas</h5>
        <div className={styles.presentation__services}>
          <p>Digital & Analog</p>
          <div className={styles.vertical_line}></div>
          <p>Fine Art Prints</p>
          <div className={styles.vertical_line}></div>
          <p>Event Documentation</p>
          <div className={styles.vertical_line}></div>
          <p>Retouching & Image Restoration</p>
        </div>
      </div>

      <div className={styles.contactSection__info}>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <h4 className={styles.contactLabel}>Email</h4>
            <a href="mailto:corentin.damasphoto@gmail.com" className={styles.contactLink}>
              corentin.damasphoto@gmail.com
            </a>
          </div>

          <div className={styles.contactItem}>
            <h4 className={styles.contactLabel}>Office</h4>
            <p >
              Calgliari - Italy
            </p>
          </div>


        </div>
      </div>

      <div className={styles.contactSection__sidebar}>
        <Link href={'/about'} className={styles.sidebar__image}>
          <Image
            src="/landingpage/color_headS.webp"
            alt="Photography of Corentin Damas author of the website and photographies"
            className={styles.profileImage}
            sizes="(max-width: 768px) 80vw, 50vw"
            width={720}
            height={480}
            quality={85}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MjAiIGhlaWdodD0iNDgwIiB2aWV3Qm94PSIwIDAgNzIwIDQ4MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y4ZmFmYyIvPjwvc3ZnPg=="
          />
        </Link>
        <div className={styles.sidebar__link}>
          <Gallery_link path="/about" content="About me" />
        </div>
      </div>
    </section>
  );
}

export default Section_Contact;
