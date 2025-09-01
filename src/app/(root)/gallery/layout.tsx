import React from "react";
import Navbar_gallery from "../../../../components/navigation/Nav_Gallery";
import Nav_GalleryPhone from "../../../../components/navigation/Nav_GalleryPhone";
import styles from "./layout.module.css";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.gallery__grid}>
      <div className={styles.gallery__grid_left}>
        <Navbar_gallery />
      </div>
      <div className={styles.gallery__grid_left}>
        <Navbar_gallery />
      </div>
      <div className={styles.gallery__grid_right}>{children}</div>
      <Nav_GalleryPhone />
    </div>
  );
}

export default layout;
