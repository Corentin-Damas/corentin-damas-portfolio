from colorthief import ColorThief


# colorthief: A Python module for grabbing the color palette from an image.

def rgb_to_hex(rgb_color):
  return ('{:02X}' * 3).format(*rgb_color)


def extract_color_palette(image_path):
    print("creating color palette for:", image_path)
    color_thief = ColorThief(image_path)

# Get dominant color and palette [In decroissant order]
    palette = color_thief.get_palette(color_count=5)
    
    return [rgb_to_hex(color) for color in palette]
