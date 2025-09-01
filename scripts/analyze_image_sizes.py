#!/usr/bin/env python3
"""
Image Size Analysis Script

Compares file sizes between original images and their WebP/AVIF versions
to report on space savings.

Usage:
python analyze_image_sizes.py [--threshold PERCENT]
"""

import os
from pathlib import Path
import argparse
from collections import defaultdict
import json
from tabulate import tabulate
import humanize

# Constants
PROJECT_ROOT = Path(__file__).parent.parent.absolute()
PUBLIC_DIR = PROJECT_ROOT / "public"


def get_file_size_kb(file_path):
    """Get file size in KB."""
    if not file_path.exists():
        return 0
    return file_path.stat().st_size / 1024  # Convert bytes to KB


def analyze_image_sizes(threshold=5):
    """
    Analyze image sizes and calculate savings.

    Args:
        threshold: Minimum percentage savings to include in detailed report
    """
    results = []
    formats = defaultdict(
        lambda: {'original_size': 0, 'converted_size': 0, 'count': 0})

    # Find all image sets (original + converted versions)
    for root, _, files in os.walk(PUBLIC_DIR):
        root_path = Path(root)

        # Group files by their base name (without extension)
        file_groups = defaultdict(list)
        for file in files:
            file_path = root_path / file
            if file_path.suffix.lower() in ('.jpg', '.jpeg', '.png', '.webp', '.avif'):
                base_name = file_path.stem
                file_groups[base_name].append(file_path)

        # Analyze each group
        for base_name, group_files in file_groups.items():
            # Find original and converted files
            original_files = [f for f in group_files if f.suffix.lower() in (
                '.jpg', '.jpeg', '.png')]
            webp_files = [f for f in group_files if f.suffix.lower()
                          == '.webp']
            avif_files = [f for f in group_files if f.suffix.lower()
                          == '.avif']

            if not original_files or (not webp_files and not avif_files):
                continue  # Skip if no original or no converted files

            # Use the first original file for comparison
            original_file = original_files[0]
            original_type = original_file.suffix.lower()[1:]  # Remove dot
            original_size = get_file_size_kb(original_file)

            # Compare with WebP
            if webp_files:
                webp_file = webp_files[0]
                webp_size = get_file_size_kb(webp_file)
                webp_savings = (original_size - webp_size) / \
                    original_size * 100 if original_size > 0 else 0

                formats[f'{original_type}_to_webp']['original_size'] += original_size
                formats[f'{original_type}_to_webp']['converted_size'] += webp_size
                formats[f'{original_type}_to_webp']['count'] += 1

                if webp_savings >= threshold:
                    rel_path = original_file.relative_to(PUBLIC_DIR)
                    results.append({
                        'path': str(rel_path),
                        'original_format': original_type,
                        'original_size': original_size,
                        'webp_size': webp_size,
                        'webp_savings': webp_savings,
                        'avif_size': None,
                        'avif_savings': None
                    })

            # Compare with AVIF
            if avif_files:
                avif_file = avif_files[0]
                avif_size = get_file_size_kb(avif_file)
                avif_savings = (original_size - avif_size) / \
                    original_size * 100 if original_size > 0 else 0

                formats[f'{original_type}_to_avif']['original_size'] += original_size
                formats[f'{original_type}_to_avif']['converted_size'] += avif_size
                formats[f'{original_type}_to_avif']['count'] += 1

                # Update existing entry if we already have one from WebP
                existing_entry = next(
                    (r for r in results if str(rel_path) == r['path']), None)
                if existing_entry:
                    existing_entry['avif_size'] = avif_size
                    existing_entry['avif_savings'] = avif_savings
                elif avif_savings >= threshold:
                    rel_path = original_file.relative_to(PUBLIC_DIR)
                    results.append({
                        'path': str(rel_path),
                        'original_format': original_type,
                        'original_size': original_size,
                        'webp_size': None,
                        'webp_savings': None,
                        'avif_size': avif_size,
                        'avif_savings': avif_savings
                    })

    return results, formats


def print_summary(formats):
    """Print a summary of format conversion savings."""
    headers = ["Conversion", "Count", "Original Size",
               "Converted Size", "Savings", "Reduction %"]
    table_data = []

    total_original = 0
    total_converted = 0
    total_count = 0

    for fmt, data in formats.items():
        if data['count'] == 0:
            continue

        original_size = data['original_size']
        converted_size = data['converted_size']
        count = data['count']
        savings = original_size - converted_size
        percentage = (savings / original_size *
                      100) if original_size > 0 else 0

        total_original += original_size
        total_converted += converted_size
        total_count += count

        table_data.append([
            fmt,
            count,
            f"{humanize.naturalsize(original_size * 1024, binary=True)}",
            f"{humanize.naturalsize(converted_size * 1024, binary=True)}",
            f"{humanize.naturalsize(savings * 1024, binary=True)}",
            f"{percentage:.1f}%"
        ])

    # Add totals
    if total_count > 0:
        total_savings = total_original - total_converted
        total_percentage = (total_savings / total_original *
                            100) if total_original > 0 else 0

        table_data.append([
            "TOTAL",
            total_count,
            f"{humanize.naturalsize(total_original * 1024, binary=True)}",
            f"{humanize.naturalsize(total_converted * 1024, binary=True)}",
            f"{humanize.naturalsize(total_savings * 1024, binary=True)}",
            f"{total_percentage:.1f}%"
        ])

    print(tabulate(table_data, headers=headers, tablefmt="grid"))


def print_detailed_report(results, limit=20):
    """Print detailed report of individual file savings, limited to top entries."""
    if not results:
        print("No files with significant savings found.")
        return

    # Sort by max savings (either WebP or AVIF)
    results.sort(key=lambda x: max(
        x['webp_savings'] if x['webp_savings'] is not None else 0,
        x['avif_savings'] if x['avif_savings'] is not None else 0
    ), reverse=True)

    # Limit to top 'limit' entries
    results = results[:limit]

    headers = ["Path", "Original", "Original Size", "WebP Size",
               "WebP Savings", "AVIF Size", "AVIF Savings"]
    table_data = []

    for entry in results:
        table_data.append([
            entry['path'],
            entry['original_format'],
            f"{entry['original_size']:.1f} KB",
            f"{entry['webp_size']:.1f} KB" if entry['webp_size'] else "N/A",
            f"{entry['webp_savings']:.1f}%" if entry['webp_savings'] is not None else "N/A",
            f"{entry['avif_size']:.1f} KB" if entry['avif_size'] else "N/A",
            f"{entry['avif_savings']:.1f}%" if entry['avif_savings'] is not None else "N/A"
        ])

    print("\nTop files with highest savings:")
    print(tabulate(table_data, headers=headers, tablefmt="grid"))


def main():
    parser = argparse.ArgumentParser(
        description='Analyze image size savings from conversion')
    parser.add_argument('--threshold', type=float, default=10.0,
                        help='Minimum percentage savings to include in detailed report')
    parser.add_argument('--limit', type=int, default=20,
                        help='Number of top files to show in detailed report')
    parser.add_argument('--output', type=str,
                        help='Output JSON file for the analysis results')
    args = parser.parse_args()

    print("Analyzing image sizes...")
    results, formats = analyze_image_sizes(args.threshold)

    # Print summary
    print_summary(formats)

    # Print detailed report
    print_detailed_report(results, args.limit)

    # Save results to file if requested
    if args.output:
        output_data = {
            'detailed': results,
            'summary': {fmt: data for fmt, data in formats.items()}
        }

        with open(args.output, 'w') as f:
            json.dump(output_data, f, indent=2)

        print(f"\nResults saved to {args.output}")


if __name__ == "__main__":
    main()
