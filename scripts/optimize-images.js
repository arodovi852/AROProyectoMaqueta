/**
 * Image Optimization Script using Sharp
 * 
 * This script generates optimized versions of images for banners and cards:
 * - Multiple sizes: small (400px), medium (800px), large (1200px), xlarge (1920px)
 * - Multiple formats: WebP (primary), original format (fallback)
 * - Quality settings optimized for each use case
 * 
 * Usage: node scripts/optimize-images.js
 * 
 * Requirements:
 * - npm install sharp --save-dev
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  inputDir: path.join(__dirname, '../assets'),
  outputDir: path.join(__dirname, '../assets/optimized'),
  
  // Size configurations for different use cases
  sizes: {
    small: { width: 400, suffix: '-small' },      // Mobile cards
    medium: { width: 800, suffix: '-medium' },    // Tablet/small desktop cards
    large: { width: 1200, suffix: '-large' },     // Banner medium
    xlarge: { width: 1920, suffix: '-xlarge' }    // Banner full HD
  },
  
  // Quality settings (0-100)
  quality: {
    webp: 85,      // WebP quality - good balance of quality/size
    jpeg: 82,      // JPEG quality for fallback
    png: 85        // PNG quality (compression level)
  },
  
  // Images to process (patterns)
  imagePatterns: [
    /^Images_For_Card_\d+\.(jpg|jpeg|png)$/i,
    /^Image_For_Card_\d+\.(jpg|jpeg|png)$/i,
    /^Twin_Peaks.*\.(jpg|jpeg|png)$/i
  ],
  
  // Maximum file size in KB (per DISEÑOFASE5 requirements)
  maxFileSizeKB: 200
};

// Ensure output directory exists
function ensureOutputDir() {
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    console.log(`📁 Created output directory: ${CONFIG.outputDir}`);
  }
}

// Check if file matches our patterns
function shouldProcessFile(filename) {
  return CONFIG.imagePatterns.some(pattern => pattern.test(filename));
}

// Get file size in KB
function getFileSizeKB(filePath) {
  const stats = fs.statSync(filePath);
  return Math.round(stats.size / 1024);
}

// Process a single image
async function processImage(inputPath, filename) {
  const baseName = path.parse(filename).name;
  const ext = path.parse(filename).ext.toLowerCase();
  
  console.log(`\n🖼️  Processing: ${filename}`);
  const originalSize = getFileSizeKB(inputPath);
  console.log(`   Original size: ${originalSize}KB`);
  
  const results = [];
  
  // Process each size
  for (const [sizeName, sizeConfig] of Object.entries(CONFIG.sizes)) {
    const outputBaseName = `${baseName}${sizeConfig.suffix}`;
    
    try {
      // Generate WebP version
      const webpOutputPath = path.join(CONFIG.outputDir, `${outputBaseName}.webp`);
      await sharp(inputPath)
        .resize(sizeConfig.width, null, {
          kernel: sharp.kernel.lanczos3,  // High quality resizing
          withoutEnlargement: false       // Allow upscaling for banners
        })
        .webp({ 
          quality: CONFIG.quality.webp,
          effort: 6  // Higher effort = better compression
        })
        .toFile(webpOutputPath);
      
      const webpSize = getFileSizeKB(webpOutputPath);
      results.push({
        name: `${outputBaseName}.webp`,
        size: webpSize,
        format: 'webp',
        dimensions: sizeName
      });
      
      // Generate original format version as fallback
      const fallbackOutputPath = path.join(CONFIG.outputDir, `${outputBaseName}${ext}`);
      
      if (ext === '.jpg' || ext === '.jpeg') {
        await sharp(inputPath)
          .resize(sizeConfig.width, null, {
            kernel: sharp.kernel.lanczos3,
            withoutEnlargement: false
          })
          .jpeg({ 
            quality: CONFIG.quality.jpeg,
            mozjpeg: true  // Use MozJPEG for better compression
          })
          .toFile(fallbackOutputPath);
      } else if (ext === '.png') {
        await sharp(inputPath)
          .resize(sizeConfig.width, null, {
            kernel: sharp.kernel.lanczos3,
            withoutEnlargement: false
          })
          .png({ 
            compressionLevel: 9,
            adaptiveFiltering: true
          })
          .toFile(fallbackOutputPath);
      }
      
      const fallbackSize = getFileSizeKB(fallbackOutputPath);
      results.push({
        name: `${outputBaseName}${ext}`,
        size: fallbackSize,
        format: ext.replace('.', ''),
        dimensions: sizeName
      });
      
      console.log(`   ✅ ${sizeName}: WebP ${webpSize}KB, ${ext.toUpperCase()} ${fallbackSize}KB`);
      
      // Check if files exceed max size
      if (webpSize > CONFIG.maxFileSizeKB) {
        console.log(`   ⚠️  Warning: ${outputBaseName}.webp exceeds ${CONFIG.maxFileSizeKB}KB limit`);
      }
      
    } catch (error) {
      console.error(`   ❌ Error processing ${sizeName}: ${error.message}`);
    }
  }
  
  return results;
}

// Generate report
function generateReport(allResults) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 OPTIMIZATION REPORT');
  console.log('='.repeat(60));
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  
  console.log('\n| Image | Size | Original | Optimized | Reduction |');
  console.log('|-------|------|----------|-----------|-----------|');
  
  for (const [filename, results] of Object.entries(allResults)) {
    const originalSize = results.originalSize;
    totalOriginal += originalSize;
    
    // Get the large WebP as representative optimized size
    const largeWebp = results.files.find(f => f.dimensions === 'large' && f.format === 'webp');
    if (largeWebp) {
      totalOptimized += largeWebp.size;
      const reduction = Math.round((1 - largeWebp.size / originalSize) * 100);
      console.log(`| ${filename} | large | ${originalSize}KB | ${largeWebp.size}KB | ${reduction}% |`);
    }
  }
  
  console.log('\n' + '-'.repeat(60));
  const totalReduction = Math.round((1 - totalOptimized / totalOriginal) * 100);
  console.log(`📈 Total: ${totalOriginal}KB → ${totalOptimized}KB (${totalReduction}% reduction)`);
  console.log('='.repeat(60));
}

// Main function
async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  ensureOutputDir();
  
  // Get all files in assets directory
  const files = fs.readdirSync(CONFIG.inputDir);
  const imageFiles = files.filter(f => shouldProcessFile(f));
  
  console.log(`Found ${imageFiles.length} images to process`);
  
  const allResults = {};
  
  for (const filename of imageFiles) {
    const inputPath = path.join(CONFIG.inputDir, filename);
    const originalSize = getFileSizeKB(inputPath);
    
    const files = await processImage(inputPath, filename);
    allResults[filename] = {
      originalSize,
      files
    };
  }
  
  generateReport(allResults);
  
  console.log('\n✨ Optimization complete!');
  console.log(`📁 Optimized images saved to: ${CONFIG.outputDir}`);
  console.log('\n💡 Next steps:');
  console.log('   1. Update your components to use srcset with optimized images');
  console.log('   2. Use <picture> element for art direction');
  console.log('   3. Add loading="lazy" for images below the fold');
}

// Run
main().catch(console.error);
