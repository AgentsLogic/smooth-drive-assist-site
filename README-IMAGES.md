# Image Setup Instructions

## Product Images

To complete the setup, please save your product images in the project root directory:

### Required Image:
1. **device-front.png** - The main product image showing the device with the screen display
   - This is the image you shared (black device with green lane centering display)
   - Save it as: `device-front.png`
   - Recommended size: 1000x667px or similar aspect ratio

### Optional Additional Angles:
If you have other product angles, save them as:
- `device-side.png` - Side view of the device
- `device-back.png` - Back view of the device
- `device-installed.png` - Device installed in car
- `device-angle-1.png` - Any other angle

## How to Add the Image:

1. Save your product image file as `device-front.png` in the same folder as `index.html`
2. The image is already configured in the HTML to load from this location
3. Refresh your browser to see the real product image

## Image Optimization Tips:

- **Format**: Use PNG for transparency, or JPG for smaller file size
- **Size**: Recommended width: 1000-1500px (will scale responsively)
- **Compression**: Use tools like TinyPNG or ImageOptim to reduce file size
- **WebP**: Consider creating a WebP version for better performance

## Current Image Configuration:

```html
<img 
  src="device-front.png" 
  alt="Smoother Drive device showing lane centering and adaptive cruise control on highway"
  class="device-image"
  loading="eager"
  width="1000"
  height="667"
/>
```

## Next Steps:

Would you like me to:
1. Create an image gallery/carousel for multiple product angles?
2. Add zoom functionality to the product image?
3. Create a lightbox for full-screen viewing?

Just let me know!

