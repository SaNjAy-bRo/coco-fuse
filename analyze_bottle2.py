import sys
from PIL import Image

def generate_js():
    filepath = r"public\bottle 360\COCO 1.png"
    img = Image.open(filepath).convert("RGBA")
    width, height = img.size
    
    profile = []
    # Increase sampling resolution
    for y in range(height-1, -1, -5):
        row_points = []
        for x in range(width):
            r, g, b, a = img.getpixel((x, y))
            if a > 10:
                row_points.append(x)
        
        if row_points:
            left = row_points[0]
            right = row_points[-1]
            radius = (right - left) / 2
            norm_y = 1.0 - (y / height)
            norm_r = radius / height
            profile.append((norm_y, norm_r))

    # sort by y just in case
    profile.sort(key=lambda x: x[0])
    
    # Filter out empty or noisy points at extremes
    profile = [p for p in profile if p[1] > 0.02]
    
    if not profile:
        return
        
    min_y = profile[0][0]
    max_y = profile[-1][0]
    y_range = max_y - min_y
    
    SCALE_Y = 5.6 / y_range  # Total height 5.6 to roughly match Can size (Can was 3.5, Bottle was ~5.5)
    SCALE_R = 12.0 # Adjust radius to look correct visually ~ max radius 1.25

    js_bottle = []
    js_liquid = []
    js_wrapper = []
    
    # Let's say wrapper exists between 15% and 80% of the bottle's height
    wrapper_y_min = -1.8
    wrapper_y_max = 1.2
    
    for y, r in profile:
        mapped_y = (y - min_y) * SCALE_Y - 2.8
        mapped_r = r * SCALE_R
        
        js_bottle.append(f"new THREE.Vector2({mapped_r:.3f}, {mapped_y:.3f})")
        
        # liquid sits a bit inside
        if mapped_y < 1.8: # Liquid level
            js_liquid.append(f"new THREE.Vector2({mapped_r * 0.94:.3f}, {mapped_y:.3f})")
            
        # wrapper sits a tiny bit outside in the middle section
        if wrapper_y_min <= mapped_y <= wrapper_y_max:
             js_wrapper.append(f"new THREE.Vector2({mapped_r + 0.015:.3f}, {mapped_y:.3f})")
    
    # print the JS arrays
    print("const getBottlePoints = () => { return [")
    print(",\n".join(js_bottle))
    print("]; };\n")
    
    print("const getLiquidPoints = () => { return [")
    # Add a flat top to liquid
    print(",\n".join(js_liquid))
    if js_liquid:
        print(f", new THREE.Vector2(0, {js_liquid[-1].split(',')[-1].replace(')','')})")
    print("]; };\n")
    
    print("const getWrapperPoints = () => { return [")
    print(",\n".join(js_wrapper))
    print("]; };\n")
    

if __name__ == "__main__":
    generate_js()
