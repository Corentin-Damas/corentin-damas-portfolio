"use client";
import Link from "next/link";
import { useState, useCallback, useRef, useEffect } from "react";
import styles from "./Nav_phone.module.css";
import ThemeSwitch from "./ThemeSwitch";

// Composant de lien mobile simplifié
const MobileNavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link className={styles.link} href={href} onClick={onClick}>
    {children}
  </Link>
);

function Nav_phone() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Toggle menu
  const toggleMenu = useCallback(() => {
    setMenuOpen((prevState) => !prevState);
  }, []);


  // Fermer le menu en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Vérifier si le clic est sur le bouton de menu (ne pas fermer dans ce cas)
      const target = event.target as Node;
      const menuButton = document.querySelector(
        `.${styles.mobile_menu_button}`
      );

      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !menuButton?.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div
      className={`${styles.mobile_nav}`}
    >
      <div className={`grain ${styles.grain_opacity}`} aria-hidden="true"></div>
      <div className={styles.mobile_nav__actions}>
        <ThemeSwitch />
        <button
          className={styles.mobile_menu_button}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Menu mobile */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`${styles.mobile_menu} ${menuOpen ? styles.open : styles.close}`}
        aria-hidden={!menuOpen}
      >
        <nav className={styles.mobile_nav__menu} role="navigation">
          <ul className={styles.mobile_nav_list}>
            <li>
              <MobileNavLink href="/" onClick={() => setMenuOpen(false)}>
                Home
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink href="/gallery" onClick={() => setMenuOpen(false)}>
                Gallery
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink href="/about" onClick={() => setMenuOpen(false)}>
                About
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink href="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </MobileNavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Nav_phone;
