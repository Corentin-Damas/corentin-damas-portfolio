#!/usr/bin/env python3
"""
Image Optimizer Script for Corentin Photo Website
Converts images to WebP and AVIF formats for better compression

Required packages:
- pip install pillow
- pip install pillow-avif-plugin
- pip install tqdm

Usage:
python optimize_images.py
"""

import os
import argparse
from pathlib import Path
from PIL import Image, ImageFile
import shutil
from tqdm import tqdm
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("image_optimization.log"),
        logging.StreamHandler()
    ]
)

# Enable loading of large images
ImageFile.LOAD_TRUNCATED_IMAGES = True

# Constants
PROJECT_ROOT = Path(__file__).parent.parent.absolute()
PUBLIC_DIR = PROJECT_ROOT / "public"
BACKUP_DIR = PROJECT_ROOT / "backup_images"
WEBP_QUALITY = 85  # Default WebP quality
AVIF_QUALITY = 80  # Default AVIF quality
JPEG_QUALITY = 85  # Default JPEG quality

# File extensions to process
IMAGE_EXTENSIONS = {
    '.png': {'webp', 'avif'},   # Convert PNGs to WebP and AVIF
    '.jpg': {'webp', 'avif'},   # Convert JPGs to WebP and AVIF
    '.jpeg': {'webp', 'avif'},  # Convert JPEGs to WebP and AVIF
}

# Directories to skip (relative to public dir)
SKIP_DIRS = {
    'font',  # Skip font directory
}


def should_process_file(file_path):
    """Check if a file should be processed based on extension and path."""
    extension = file_path.suffix.lower()

    # Check if it's an image we want to convert
    if extension not in IMAGE_EXTENSIONS:
        return False

    # Check if file is in a directory we want to skip
    for skip_dir in SKIP_DIRS:
        if skip_dir in file_path.parts:
            return False

    return True


def backup_image(file_path):
    """Create a backup of the original image."""
    rel_path = file_path.relative_to(PUBLIC_DIR)
    backup_path = BACKUP_DIR / rel_path

    # Create directory if it doesn't exist
    backup_path.parent.mkdir(parents=True, exist_ok=True)

    # Copy the file if backup doesn't exist
    if not backup_path.exists():
        shutil.copy2(file_path, backup_path)
        logging.info(f"Created backup: {backup_path}")


def convert_to_webp(image_path, quality=WEBP_QUALITY):
    """Convert an image to WebP format."""
    try:
        output_path = image_path.with_suffix('.webp')

        # Skip if WebP already exists and is newer
        if output_path.exists() and output_path.stat().st_mtime > image_path.stat().st_mtime:
            logging.info(f"WebP already exists and is newer: {output_path}")
            return output_path

        img = Image.open(image_path)

        # Convert RGBA to RGB if needed for JPG outputs
        if img.mode == 'RGBA':
            # Use white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            # Use alpha channel as mask
            background.paste(img, mask=img.split()[3])
            img = background

        img.save(output_path, 'WEBP', quality=quality)
        logging.info(f"Converted to WebP: {output_path}")
        return output_path
    except Exception as e:
        logging.error(f"Error converting {image_path} to WebP: {e}")
        return None


def convert_to_avif(image_path, quality=AVIF_QUALITY):
    """Convert an image to AVIF format."""
    try:
        output_path = image_path.with_suffix('.avif')

        # Skip if AVIF already exists and is newer
        if output_path.exists() and output_path.stat().st_mtime > image_path.stat().st_mtime:
            logging.info(f"AVIF already exists and is newer: {output_path}")
            return output_path

        img = Image.open(image_path)

        # Convert RGBA to RGB if needed
        if img.mode == 'RGBA':
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3])
            img = background

        img.save(output_path, 'AVIF', quality=quality)
        logging.info(f"Converted to AVIF: {output_path}")
        return output_path
    except Exception as e:
        logging.error(f"Error converting {image_path} to AVIF: {e}")
        return None


def process_image(image_path):
    """Process a single image file."""
    if not should_process_file(image_path):
        return

    # Create backup of original image
    backup_image(image_path)

    # Get target formats based on file extension
    extension = image_path.suffix.lower()
    target_formats = IMAGE_EXTENSIONS.get(extension, set())

    results = {}

    # Convert to target formats
    if 'webp' in target_formats:
        webp_path = convert_to_webp(image_path)
        if webp_path:
            results['webp'] = webp_path

    if 'avif' in target_formats:
        avif_path = convert_to_avif(image_path)
        if avif_path:
            results['avif'] = avif_path

    return results


def scan_directory():
    """Scan public directory for images to optimize."""
    all_images = []

    for root, dirs, files in os.walk(PUBLIC_DIR):
        root_path = Path(root)

        # Skip directories in SKIP_DIRS
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]

        for file in files:
            file_path = root_path / file
            if should_process_file(file_path):
                all_images.append(file_path)

    return all_images


def main():
    parser = argparse.ArgumentParser(
        description='Optimize images for the website')
    parser.add_argument('--webp-only', action='store_true',
                        help='Only convert to WebP format (skip AVIF)')
    parser.add_argument('--quality', type=int,
                        help='Quality setting for WebP/AVIF (1-100)')
    args = parser.parse_args()

    # Update quality settings if provided
    global WEBP_QUALITY, AVIF_QUALITY
    if args.quality:
        WEBP_QUALITY = args.quality
        AVIF_QUALITY = args.quality

    # If webp-only flag is set, remove avif from target formats
    if args.webp_only:
        for ext in IMAGE_EXTENSIONS:
            if 'avif' in IMAGE_EXTENSIONS[ext]:
                IMAGE_EXTENSIONS[ext].remove('avif')

    # Create backup directory
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)

    logging.info("Scanning for images to optimize...")
    images = scan_directory()
    logging.info(f"Found {len(images)} images to process")

    # Process all images with a progress bar
    converted_count = {'webp': 0, 'avif': 0}
    with tqdm(total=len(images), desc="Converting images") as pbar:
        for img_path in images:
            results = process_image(img_path)
            if results:
                for fmt, path in results.items():
                    if path:
                        converted_count[fmt] += 1
            pbar.update(1)

    logging.info(
        f"Conversion complete: {converted_count['webp']} WebP and {converted_count['avif']} AVIF files created")
    logging.info(f"Original images backed up to: {BACKUP_DIR}")


if __name__ == "__main__":
    main()
