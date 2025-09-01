"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import styles from "./Nav_GalleryPhone.module.css";
import Navbar_gallery from "./Nav_Gallery";

function Nav_GalleryPhone() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  // Fermer si clic à l'extérieur (utiliser 'click' pour laisser la nav se faire)
  useEffect(() => {
    if (!menuOpen) return;

    const handleDocClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedInsideMenu = menuRef.current?.contains(target);
      const clickedButton = buttonRef.current?.contains(target);

      if (!clickedInsideMenu && !clickedButton) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, [menuOpen]);

  // Si on clique un lien dans le menu, on ferme (après le click)
  const handleMenuClick = (e: React.MouseEvent) => {
    const el = e.target as HTMLElement;
    if (el.closest("a, [role='menuitem']")) {
      setMenuOpen(false);
    }
  };

  return (
    <div className={styles.mobile_project_nav}>
      <div className={`grain ${styles.grain_opacity}`} aria-hidden="true" />
      <div className={styles.mobile_nav__actions}>
        <p>Explore other _&gt; </p>
        <button
          ref={buttonRef}
          className={styles.mobile_menu_button}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close projects menu" : "Open projects menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          Projects
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        onClick={handleMenuClick}
        className={`${styles.mobile_menu} ${
          menuOpen ? styles.open : styles.close
        }`}
        aria-hidden={!menuOpen}
      >
        <Navbar_gallery />
      </div>
    </div>
  );
}

export default Nav_GalleryPhone;
