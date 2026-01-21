import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * 404 Page - Not Found
 * 
 * Displayed when the requested route does not exist (wildcard **)
 */
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  currentYear = new Date().getFullYear();
}
