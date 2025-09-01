import React from 'react';
import styles from '../gallery/Hero_gallery.module.css';
import Project_Story from './Project_Story';

function Hero_gallery({
  title,
  c1,
  c2,
  c3,
  storyContent,
}: {
  title: string;
  c1: string;
  c2: string;
  c3: string;
  storyContent?: React.ReactNode;
}) {
  return (
    <div className={styles.heroSection}>
      <div className={styles.title_container}>
        <div className={styles.titleContent}>
          <h2 className={styles.title_txt}>{title}</h2>
          <div className={styles.keywords}>
            <p className={`${styles.presentation__sub_txt} body_02`}>{c1}</p>
            <div className="dot"></div>
            <p className={`${styles.presentation__sub_txt} body_02`}>{c2}</p>
            <div className="dot"></div>
            <p className={`${styles.presentation__sub_txt} body_02`}>{c3}</p>
          </div>
        </div>
        <div className={styles.DesktopText}>

          {storyContent && <Project_Story txt={storyContent} />}
        </div>

      </div>
    </div>
  );
}

export default Hero_gallery;
