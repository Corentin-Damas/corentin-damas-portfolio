from math import gcd
import exiftool

TAGS_TO_RETRIVE = ['ImageSize', 'ImageWidth',
                   'ImageHeight', 'ImageDescription',
                   'ExposureTime', 'FNumber', 'ISO',
                   'DigitalCreationDate', 'DigitalCreationTime',
                   'City', 'Country-PrimaryLocationName',
                   'ImageDescription', 'Caption-Abstract', 'Title']


def simplify_ratio(width, height):
    divisor = gcd(width, height)

    GENERAL_RATIO = {"1:1": 1, "5:4": 1.25, "7:5": 1.4,
                     "3:2": 1.5, "4:3": 1.333, "16:10": 1.6, "16:9": 1.778}

    if width >= height:  # Landscape or square
        str_ratio = f"{width // divisor}:{height // divisor}"
        calculated_ratio = width / height
    else:  # Portrait
        str_ratio = f"{height // divisor}:{width // divisor}"
        calculated_ratio = height / width

    if str_ratio not in GENERAL_RATIO:
        closest_ratio = min(
            GENERAL_RATIO.items(),
            key=lambda x: abs(calculated_ratio - x[1])
        )
        return closest_ratio[0]
    return str_ratio


def detect_format(width, height):
    if width and height:
        if width == height:
            return "Square"
        elif width > height:
            return "Landscape"
        else:
            return "Portrait"
    return "Unknown Format"


# Function to extract metadata
def extract_metadata(file_path):
    metadata = {}
    try:
        with exiftool.ExifToolHelper() as et:
            # Try different encodings
            encodings_to_try = ['utf-8', 'latin-1', 'cp1252', 'utf-16']

            for encoding in encodings_to_try:
                try:
                    et._encoding = encoding  # Directly set the encoding
                    tags = et.get_tags([file_path], tags=TAGS_TO_RETRIVE)

                    for d in tags:
                        for k, v in d.items():
                            metadata[k] = v

                    break  # Stop if successful
                except UnicodeDecodeError:
                    continue
            else:
                print(
                    f"Could not decode metadata for {file_path} with any tried encoding")

    except Exception as e:
        print(f"Error extracting metadata from {file_path}: {e}")

    if metadata.get("File:ImageWidth") and metadata.get('File:ImageHeight'):
        metadata['aspect_ratio'] = simplify_ratio(
            metadata["File:ImageWidth"], metadata['File:ImageHeight'])
        metadata['image_format'] = detect_format(
            metadata["File:ImageWidth"], metadata['File:ImageHeight'])
    else:
        print(f'error at {file_path}')

    return metadata


def show_all_metadata(file_path):
    metadata = {}
    with exiftool.ExifTool() as et:
        metadata = et.execute("-charset", "UTF8",
                              "-TAGS_TO_RETRIVE", file_path)
        print(metadata)
    # return metadata
