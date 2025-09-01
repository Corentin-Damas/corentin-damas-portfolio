import os
import json

from modules import extract_color_palette
from modules import extract_metadata
from modules import show_all_metadata

PUBLIC_FOLDER = "./public"
OUTPUT_FOLDER = "./data"
OUTPUT_FILE = os.path.join(OUTPUT_FOLDER, "image_metadata.json")
EXIFTOOL_PATH = r"C:\Users\coren\Desktop\exiftool-13.03_64\exiftool.exe"

CURRENT_PROJECT = ['a_year_in_japan', 'black_and_white', 'earth_and_sky',
                   'infrared', 'morning_shadows', 'museums', 'tsuzukitai']
TEST_PROJECT = ['test']


def main():
    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    all_metadata = {}

    for project_name in CURRENT_PROJECT:
        img_file_path = os.path.join(PUBLIC_FOLDER, project_name, "origine")

        for image in os.listdir(img_file_path):
            if image.lower().endswith((".png", ".jpg", ".jpeg", ".gif")):
                image_path = os.path.join(img_file_path, image)
                # show_all_metadata(filepath)
                
                metadata = extract_metadata(image_path)
                metadata["palette"] = extract_color_palette(image_path)
        
                all_metadata[image] = metadata


    # Save metadata to JSON file
    with open(OUTPUT_FILE, "w", encoding="utf-8") as json_file:
        json.dump(all_metadata, json_file, ensure_ascii=False,  indent=4)

    print(f"Metadata saved to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
