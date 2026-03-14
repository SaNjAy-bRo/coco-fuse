import fitz
import os

def extract_high_res_labels(pdf_path, output_name):
    try:
        doc = fitz.open(pdf_path)
        page = doc[0] # Assume the label is on the first page
        
        # Render page to a high-res image (300 DPI)
        # Standard PDF DPI is 72, so 300/72 = 4.166...
        zoom = 300 / 72
        mat = fitz.Matrix(zoom, zoom)
        pix = page.get_pixmap(matrix=mat, alpha=False)
        
        output_path = f"public/assets/{output_name}.png"
        pix.save(output_path)
        print(f"Saved high-res {output_path}")
        doc.close()
    except Exception as e:
        print(f"Error processing {pdf_path}: {e}")

assets_dir = "c:/Users/Sanjay Kumar/Documents/mango label/cocofuse-website/public/assets"
os.chdir("c:/Users/Sanjay Kumar/Documents/mango label/cocofuse-website")

extract_high_res_labels(os.path.join(assets_dir, "Watermelon Label.pdf"), "watermelon_label_extracted")
extract_high_res_labels(os.path.join(assets_dir, "Chili Label.pdf"), "chili_label_extracted")
