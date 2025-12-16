import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-watch-later',
  imports: [],
  templateUrl: './watch-later.html',
  styleUrl: './watch-later.scss',
})
export class WatchLater {
  @Input() text = 'Watch later';
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
