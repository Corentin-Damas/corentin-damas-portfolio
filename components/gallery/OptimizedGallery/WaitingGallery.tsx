import styles from './WaitingGallery.module.css';

/**
 * Skeleton loader for gallery projects
 * Displays a placeholder while content is loading
 */
export default function WaitingGallery() {
  return (
      <div className={styles.galleryGrid}>
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div key={index} className={styles.galleryItem}>
              <div className={styles.galleryImage} />
            </div>
          ))}
      </div>
  );
}
