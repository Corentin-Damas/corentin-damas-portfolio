import styles from './GalleryLoadingEffect.module.css';

/**
 * Skeleton loader for gallery projects
 * Displays a placeholder while content is loading
 */
export default function GalleryLoadingEffect() {
  return (
    <div className={styles.skeletonContainer}>
      {/* Hero section skeleton */}
      <div className={styles.heroSkeleton}>
        <div className={styles.heroTitle} />
        <div className={styles.heroImage} />
      </div>

      {/* Gallery grid skeleton */}
      <div className={styles.galleryGrid}>
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div key={index} className={styles.galleryItem}>
              <div className={styles.galleryImage} />
            </div>
          ))}
      </div>

      {/* Text section skeleton */}
      <div className={styles.textSkeleton}>
        <div className={styles.textHeading} />
        <div className={styles.textParagraph} />
        <div className={styles.textParagraph} />
        <div className={styles.textParagraph} />
      </div>
    </div>
  );
}
