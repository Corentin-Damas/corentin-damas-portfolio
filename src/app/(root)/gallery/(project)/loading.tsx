import { Suspense } from 'react';
import GalleryLoadingEffect from '../../../../../components/gallery/GalleryLoadingEffect';

/**
 * Loading component for gallery project pages
 * Uses the GallerySkeleton component to display a loading placeholder
 */
export default function Loading() {
  return  <GalleryLoadingEffect />;
}
