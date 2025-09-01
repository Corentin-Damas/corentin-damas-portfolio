'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import styles from './Nav_Gallery.module.css';
import Link from 'next/link';
import { isActiveRoute, galleryRoutesByCategory } from '../../utils/navigation';

function Navbar_gallery() {
  const pathname = usePathname();

  // Get all project and side project links from our centralized route config
  const projectLinks = galleryRoutesByCategory['Projects'] || [];
  const sideProjectLinks = galleryRoutesByCategory['Side works'] || [];

  return (
    <nav className={styles.nav} aria-label="Gallery navigation">
      <div className={styles.links__list}>
        <h2 className={styles.links__list_name} id="projects-heading">
          Projects
        </h2>
        <ul className={`${styles.link__group}`} aria-labelledby="projects-heading">
          {projectLinks.map((el) => (
            <li className={styles.link__li} key={el.id}>
              <p className={styles.number} aria-hidden="true">
                _{el.id} <span className={styles.bar}>|</span>{' '}
              </p>
              <Link
                scroll={true}
                href={el.path}
                className={`${isActiveRoute(pathname, el.path, true) ? styles.currPage : ''} ${styles.link__li_title}`}
                aria-current={isActiveRoute(pathname, el.path, true) ? 'page' : undefined}
              >
                {el.label}
              </Link>
            </li>
          ))}
        </ul>

        <h2 className={styles.links__list_name} id="side-works-heading">
          Side works
        </h2>
        <ul className={styles.link__group} aria-labelledby="side-works-heading">
          {sideProjectLinks.map((el) => (
            <li className={styles.link__li} key={el.id}>
              <p className={styles.number} aria-hidden="true">
                _{el.id} <span className={styles.bar}>|</span>{' '}
              </p>
              <Link
                href={el.path}
                className={`${isActiveRoute(pathname, el.path, true) ? styles.currPage : ''}  ${styles.link__li_title}`}
                aria-current={isActiveRoute(pathname, el.path, true) ? 'page' : undefined}
              >
                {el.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar_gallery;
