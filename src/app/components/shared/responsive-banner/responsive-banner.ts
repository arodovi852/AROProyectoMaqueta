import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Responsive Banner Component
 * 
 * Displays a banner image with responsive srcset and picture element.
 * Automatically loads optimized WebP images with fallback to original format.
 * 
 * Features:
 * - Uses <picture> element for art direction
 * - srcset for multiple resolutions
 * - WebP with fallback to original format
 * - Lazy loading for performance
 * 
 * Usage:
 * <app-responsive-banner 
 *   [imageSrc]="'/assets/Images_For_Card_1.jpg'"
 *   [alt]="'Banner title'"
 * />
 */
@Component({
  selector: 'app-responsive-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <picture class="responsive-banner">
      <!-- WebP sources for modern browsers -->
      <source 
        type="image/webp"
        [srcset]="getWebPSrcset()"
        sizes="100vw"
      >
      
      <!-- Fallback sources (original format) -->
      <source 
        [type]="getOriginalType()"
        [srcset]="getOriginalSrcset()"
        sizes="100vw"
      >
      
      <!-- Fallback img element -->
      <img 
        [src]="getLargeSrc()"
        [alt]="alt"
        class="responsive-banner__image"
        loading="eager"
        fetchpriority="high"
      >
    </picture>
  `,
  styles: [`
    .responsive-banner {
      display: block;
      width: 100%;
      height: 100%;
    }
    
    .responsive-banner__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponsiveBanner {
  /**
   * Original image source path (e.g., '/assets/Images_For_Card_1.jpg')
   */
  @Input() imageSrc = '';
  
  /**
   * Alt text for the image
   */
  @Input() alt = 'Banner image';

  /**
   * Get the base name and extension from imageSrc
   */
  private getImageParts(): { baseName: string; ext: string; dir: string } {
    const parts = this.imageSrc.split('/');
    const filename = parts.pop() || '';
    const dir = parts.join('/');
    
    const dotIndex = filename.lastIndexOf('.');
    const baseName = dotIndex > 0 ? filename.substring(0, dotIndex) : filename;
    const ext = dotIndex > 0 ? filename.substring(dotIndex) : '.jpg';
    
    return { baseName, ext, dir };
  }

  /**
   * Generate WebP srcset for responsive images
   */
  getWebPSrcset(): string {
    const { baseName } = this.getImageParts();
    const optimizedDir = '/assets/optimized';
    
    return [
      `${optimizedDir}/${baseName}-small.webp 400w`,
      `${optimizedDir}/${baseName}-medium.webp 800w`,
      `${optimizedDir}/${baseName}-large.webp 1200w`,
      `${optimizedDir}/${baseName}-xlarge.webp 1920w`
    ].join(', ');
  }

  /**
   * Generate original format srcset as fallback
   */
  getOriginalSrcset(): string {
    const { baseName, ext } = this.getImageParts();
    const optimizedDir = '/assets/optimized';
    
    return [
      `${optimizedDir}/${baseName}-small${ext} 400w`,
      `${optimizedDir}/${baseName}-medium${ext} 800w`,
      `${optimizedDir}/${baseName}-large${ext} 1200w`,
      `${optimizedDir}/${baseName}-xlarge${ext} 1920w`
    ].join(', ');
  }

  /**
   * Get the MIME type for the original format
   */
  getOriginalType(): string {
    const { ext } = this.getImageParts();
    const types: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif'
    };
    return types[ext.toLowerCase()] || 'image/jpeg';
  }

  /**
   * Get the large WebP source as default
   */
  getLargeSrc(): string {
    const { baseName } = this.getImageParts();
    return `/assets/optimized/${baseName}-large.webp`;
  }
}
