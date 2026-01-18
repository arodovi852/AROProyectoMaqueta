import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Página 404 - Not Found
 * 
 * Se muestra cuando la ruta solicitada no existe (wildcard **)
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
