import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { routes } from '../../utils/navigation';

const date = new Date().getFullYear();

function Footer() {
  return (
    <footer className={styles.footer} id="footer_id">
      <div className={`grain ${styles.grain_opacity}`} aria-hidden="true"></div>
      <div className={styles.columnsContainer}>
        <div className={styles.left}>
          <h2 className={styles.footer__columnHead}>Corentin Damas</h2>
          <p className={styles.footer__description}>
            A visual journey through light and shadow, exploring the world through the lens of a photographer.
            Specializing in fine art, documentary, and travel photography that captures fleeting moments and reveals the
            beauty of our shared human experience.
          </p>
          <p className={styles.footer__text}>corentin.damasphoto@gmail.com</p>
        </div>
        <div className={styles.right}>
          <h5 className={`${styles.footer__Nav} ${styles.footer__columnHead}`}>Explore</h5>
          <div className={styles.links__container}>
            <div className={styles.links_column}>
              <h6 className={styles.links_title}>Projects</h6>
              <div className={styles.links}>
                <Link href="/gallery/tsuzukitai" className={styles.link}>
                  Trapped Memories
                </Link>
                <Link href="/gallery/a_year_in_japan" className={styles.link}>
                  A Year in Japan
                </Link>
                <Link href="/gallery/infrared" className={styles.link}>
                  Infrared
                </Link>
                <Link href="/gallery/morning_shadows" className={styles.link}>
                  Morning Shadows
                </Link>
              </div>
            </div>
            <div className={styles.links_column}>
              <h6 className={styles.links_title}>Navigation</h6>
              <div className={styles.links}>
                <Link href={routes.gallery.path} className={styles.link}>
                  Gallery
                </Link>

                <Link href={routes.about.path} className={styles.link}>
                  About
                </Link>

                <Link href={routes.contact.path} className={styles.link}>
                  Contact
                </Link>

                <Link href="/" className={styles.link}>
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>Copyright &copy; {date} Corentin Damas | All Rights Reserved</div>
    
    </footer>
  );
}

export default Footer;
