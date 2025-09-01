'use client';
import Link from 'next/link';
import styles from './Nav.module.css';
import ThemeSwitch from './ThemeSwitch';
import Nav_phone from './Nav_phone';
// Composant de lien simplifié sans hooks
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li className={styles.nav_item}>
    <Link className={styles.link} href={href}>
      {children}
    </Link>
  </li>
);

function Nav() {
  return (
    <>
      <nav className={styles.nav} aria-label="Main Navigation">
        <div className={`grain ${styles.grain_opacity}`} aria-hidden="true"></div>

        <div className={styles.link_containeur}>
          <Link href="/" className={styles.myLogo} tabIndex={0}>
            <span className={styles.logo_text}>Corentin Damas</span>
          </Link>
        </div>

        <div className={styles.nav__actions}>
          <ThemeSwitch />
        </div>

        <div className={styles.nav__menu} role="navigation">
          <ul className={styles.nav_list}>
            <NavLink href="/gallery">Gallery</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </ul>
        </div>
      </nav>
      <Nav_phone />
    </>
  );
}

export default Nav;
