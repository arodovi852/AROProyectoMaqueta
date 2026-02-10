import { Component, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Star } from '../star/star';
import { StatBar } from '../stat-bar/stat-bar';
import { WatchLater } from '../watch-later/watch-later';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-card',
  imports: [Star, StatBar, WatchLater, CommonModule],
  templateUrl: './componente-hijo.html',
  styleUrl: './componente-hijo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ComponenteHijo {

  private router = inject(Router);

  @Input() filledStars = 0;
    
}