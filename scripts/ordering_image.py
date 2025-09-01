import os
import json

PUBLIC_FOLDER = "./public"
OUTPUT_FOLDER = "./data"
OUTPUT_FILE = os.path.join(OUTPUT_FOLDER, "image_order.json")

CURRENT_PROJECT = ['a_year_in_japan', 'black_and_white', 'earth_and_sky',
                   'infrared', 'morning_shadows', 'museums', 'tsuzukitai']
TEST_PROJECT = ['test']


def main():
    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    order_per_project = {}

    for project_name in CURRENT_PROJECT:
        img_file_path = os.path.join(PUBLIC_FOLDER, project_name, "L")
        project_order = {}
        order = 1    
        for image in os.listdir(img_file_path):
            if image.lower().endswith((".png", ".jpg", ".jpeg", ".gif")):
                project_order[order] = image
            order += 1
                
        order_per_project[project_name] = project_order
        
                # Save metadata to JSON file
    with open(OUTPUT_FILE, "w", encoding="utf-8") as json_file:
        json.dump(order_per_project, json_file, ensure_ascii=False,  indent=4)

    print(f"Metadata saved to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
