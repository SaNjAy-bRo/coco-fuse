import sys
from PIL import Image

def analyze_image(filepath):
    try:
        img = Image.open(filepath).convert("RGBA")
        width, height = img.size
        print(f"Image format: {img.format}, size: {width}x{height}")
        
        # We want to extract the contour.
        # Let's find the first and last non-transparent pixel on each row.
        # That gives us the profile of the bottle.
        profile = []
        for y in range(0, height, max(1, height // 100)): # sample 100 points
            row_points = []
            for x in range(width):
                r, g, b, a = img.getpixel((x, y))
                if a > 10:  # consider >10 alpha as non-transparent
                    row_points.append(x)
            
            if row_points:
                left = row_points[0]
                right = row_points[-1]
                mid = (left + right) / 2
                radius = (right - left) / 2
                # normalized y from bottom (0) to top (1)
                norm_y = 1.0 - (y / height)
                # normalized radius
                norm_r = radius / height
                profile.append((norm_y, norm_r))
        
        print("Extracted profile (y, radius_ratio):")
        for y, r in profile:
            print(f"{y:.3f}, {r:.3f}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    analyze_image(r"public\bottle 360\COCO 1.png")
