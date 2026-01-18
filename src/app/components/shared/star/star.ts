import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  imports: [],
  templateUrl: './star.html',
  styleUrl: './star.scss',
})
export class Star {
  @Input() filled = false;
  @Input() hoverFill = 0; // 0 = vacía, 0.5 = media, 1 = llena
  @Input() isClicked = false; // Si la estrella está en estado clicked (morado)
  @Input() isHovering = false; // Si la estrella está en estado hover (blanco)
  @Output() toggle = new EventEmitter<void>();
  @Output() hoverChange = new EventEmitter<number>();
  @Output() clickStar = new EventEmitter<number>();

  hoverPercent = 0;

  onToggle(): void {
    const fillValue = this.hoverPercent > 0 ? this.hoverPercent : (this.filled ? 1 : 0.5);
    this.clickStar.emit(fillValue);
    this.toggle.emit();
  }

  onMouseMove(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percent = x / rect.width;
    
    // Determinar si es media estrella o llena
    const fillValue = percent < 0.5 ? 0.5 : 1;
    this.hoverChange.emit(fillValue);
    this.hoverPercent = fillValue;
  }

  onMouseLeave(): void {
    this.hoverPercent = 0;
    this.hoverChange.emit(0);
  }

  getClipPath(): string {
    let fillPercent = 0;
    
    if (this.hoverPercent > 0) {
      fillPercent = this.hoverPercent;
    } else if (this.filled) {
      fillPercent = 1;
    } else {
      fillPercent = this.hoverFill;
    }
    
    const percentage = fillPercent * 100;
    return `inset(0 ${100 - percentage}% 0 0)`;
  }
  
  getFilledClass(): string {
    const classes = ['star', 'star--filled'];
    if (this.isClicked) classes.push('star--clicked');
    if (this.isHovering) classes.push('star--hover');
    return classes.join(' ');
  }
}
