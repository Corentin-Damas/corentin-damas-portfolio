# Image Optimization Scripts

This directory contains scripts for optimizing images on the Corentin Photo Website.

## Prerequisites

Install the required Python packages:

```bash
pip install pillow pillow-avif-plugin tqdm tabulate humanize
```

## Scripts Overview

### 1. Image Format Conversion (`optimize_images.py`)

Converts JPG/PNG images to WebP and AVIF formats for better compression and performance.

**Usage:**

```bash
python optimize_images.py [--webp-only] [--quality QUALITY]
```

**Options:**

- `--webp-only`: Only convert to WebP format (skip AVIF)
- `--quality`: Set quality level for WebP/AVIF (1-100, default: WebP=85, AVIF=80)

**Features:**

- Automatically backs up original images to a `backup_images` directory
- Skips already converted images if they're newer than the original
- Handles transparency in PNG files
- Provides progress bar and detailed logging

### 2. Image Size Analysis (`analyze_image_sizes.py`)

Analyzes file size differences between original images and their WebP/AVIF versions.

**Usage:**

```bash
python analyze_image_sizes.py [--threshold PERCENT] [--limit COUNT] [--output FILE]
```

**Options:**

- `--threshold`: Minimum percentage savings to include in detailed report (default: 10%)
- `--limit`: Number of top files to show in detailed report (default: 20)
- `--output`: Save analysis results to a JSON file

**Output:**

- Summary table of conversion savings by format
- Detailed report of individual files with highest savings
- Optional JSON output for further processing

## Workflow Example

1. Convert all images to WebP and AVIF:

   ```bash
   python optimize_images.py
   ```

2. Analyze the size savings:

   ```bash
   python analyze_image_sizes.py
   ```

3. If you want to only use WebP (better browser support):
   ```bash
   python optimize_images.py --webp-only
   ```

## Next Steps

After converting images, update your Next.js components to use the new formats:

```jsx
<Image
  src={`/path/to/image.jpg`}
  alt="Description"
  width={800}
  height={600}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
  placeholder="blur"
  blurDataURL="data:image/svg+xml;..."
/>
```

Consider implementing:

1. Picture element with source sets for different formats
2. Responsive image sizes
3. Lazy loading for below-fold images
