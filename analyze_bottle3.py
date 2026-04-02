import sys
from PIL import Image

def generate_js():
    filepath = r"public\bottle 360\COCO 1.png"
    img = Image.open(filepath).convert("RGBA")
    width, height = img.size
    
    profile = []
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

    profile.sort(key=lambda x: x[0])
    profile = [p for p in profile if p[1] > 0.02]
    
    if not profile:
        return
        
    min_y = profile[0][0]
    max_y = profile[-1][0]
    y_range = max_y - min_y
    
    SCALE_Y = 5.6 / y_range  
    SCALE_R = 12.0 

    js_bottle = []
    js_liquid = []
    js_wrapper = []
    
    wrapper_y_min = -1.8
    wrapper_y_max = 1.2
    
    js_bottle.append("new THREE.Vector2(0.000, -2.800)")
    js_liquid.append("new THREE.Vector2(0.000, -2.800)")
    
    for y, r in profile:
        mapped_y = (y - min_y) * SCALE_Y - 2.8
        mapped_r = r * SCALE_R
        
        js_bottle.append(f"new THREE.Vector2({mapped_r:.3f}, {mapped_y:.3f})")
        
        if mapped_y < 1.8: 
            js_liquid.append(f"new THREE.Vector2({mapped_r * 0.94:.3f}, {mapped_y:.3f})")
            
        if wrapper_y_min <= mapped_y <= wrapper_y_max:
             js_wrapper.append(f"new THREE.Vector2({mapped_r + 0.015:.3f}, {mapped_y:.3f})")
    
    js_bottle.append(f"new THREE.Vector2(0.000, {mapped_y:.3f})")
    if js_liquid:
        latest_y = js_liquid[-1].split(',')[-1].replace(')','')
        js_liquid.append(f"new THREE.Vector2(0.000, {latest_y})")

    out = "import * as THREE from 'three';\n\n"
    out += "export const getBottlePoints = () => [\n  "
    out += ",\n  ".join(js_bottle)
    out += "\n];\n\n"
    
    out += "export const getLiquidPoints = () => [\n  "
    out += ",\n  ".join(js_liquid)
    out += "\n];\n\n"
    
    out += "export const getWrapperPoints = () => [\n  "
    out += ",\n  ".join(js_wrapper)
    out += "\n];\n"
    
    with open(r"src\components\BottlePoints.ts", "w", encoding="utf-8") as f:
        f.write(out)

if __name__ == "__main__":
    generate_js()
