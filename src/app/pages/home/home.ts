import { Component } from '@angular/core';
import { Hero } from '../../components/sections/hero/hero';
import { Features } from '../../components/sections/features/features';
import { Cta } from '../../components/sections/cta/cta';

/**
 * Página Home
 * 
 * Página principal de la aplicación
 */
@Component({
  selector: 'app-home',
  imports: [Hero, Features, Cta],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
