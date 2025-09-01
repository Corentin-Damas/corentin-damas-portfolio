import Link from 'next/link';
import styles from './Gallery_link.module.css';

function Gallery_link({ path, content }: { path: string; content: string }) {
  return (
    <div className={styles.link_container}>
      <Link href={path} className={styles.gallery_Link}>
        {content}
        <span className="main-Color"> _&gt;</span>
      </Link>
    </div>
  );
}

export default Gallery_link;
