// Image Optimizer Script
let originalFile = null;
let optimizedBlob = null;

const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const qualitySlider = document.getElementById('quality');
const maxWidthSlider = document.getElementById('maxWidth');
const qualityValue = document.getElementById('qualityValue');
const maxWidthValue = document.getElementById('maxWidthValue');
const previewArea = document.getElementById('previewArea');
const originalPreview = document.getElementById('originalPreview');
const optimizedPreview = document.getElementById('optimizedPreview');
const originalStats = document.getElementById('originalStats');
const optimizedStats = document.getElementById('optimizedStats');
const savings = document.getElementById('savings');
const downloadBtn = document.getElementById('downloadBtn');

// Upload area click
uploadArea.addEventListener('click', () => fileInput.click());

// Drag and drop
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    handleFile(file);
  }
});

// File input change
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) handleFile(file);
});

// Quality slider
qualitySlider.addEventListener('input', (e) => {
  qualityValue.textContent = e.target.value + '%';
  if (originalFile) optimizeImage();
});

// Max width slider
maxWidthSlider.addEventListener('input', (e) => {
  maxWidthValue.textContent = e.target.value + 'px';
  if (originalFile) optimizeImage();
});

// Download button
downloadBtn.addEventListener('click', () => {
  if (optimizedBlob) {
    const url = URL.createObjectURL(optimizedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized-' + originalFile.name;
    a.click();
    URL.revokeObjectURL(url);
  }
});

function handleFile(file) {
  originalFile = file;
  
  // Show original preview
  const reader = new FileReader();
  reader.onload = (e) => {
    originalPreview.src = e.target.result;
    originalStats.textContent = `${(file.size / 1024).toFixed(2)} KB`;
    optimizeImage();
  };
  reader.readAsDataURL(file);
  
  previewArea.classList.add('active');
}

function optimizeImage() {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Calculate new dimensions
    const maxWidth = parseInt(maxWidthSlider.value);
    let width = img.width;
    let height = img.height;
    
    if (width > maxWidth) {
      height = (height * maxWidth) / width;
      width = maxWidth;
    }
    
    canvas.width = width;
    canvas.height = height;
    
    // Draw image
    ctx.drawImage(img, 0, 0, width, height);
    
    // Convert to blob
    const quality = parseInt(qualitySlider.value) / 100;
    canvas.toBlob((blob) => {
      optimizedBlob = blob;
      
      // Show optimized preview
      const url = URL.createObjectURL(blob);
      optimizedPreview.src = url;
      optimizedStats.textContent = `${(blob.size / 1024).toFixed(2)} KB`;
      
      // Calculate savings
      const savedBytes = originalFile.size - blob.size;
      const savedPercent = ((savedBytes / originalFile.size) * 100).toFixed(1);
      savings.innerHTML = `💾 Saved ${(savedBytes / 1024).toFixed(2)} KB (${savedPercent}% reduction)`;
      
      // Cleanup
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }, 'image/jpeg', quality);
  };
  
  img.src = originalPreview.src;
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

