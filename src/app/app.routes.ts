import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Productos } from './pages/productos/productos';
import { Contacto } from './pages/contacto/contacto';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'BROADCAST - Soluciones tecnológicas innovadoras'
  },
  {
    path: 'productos',
    component: Productos,
    title: 'Productos - BROADCAST'
  },
  {
    path: 'contacto',
    component: Contacto,
    title: 'Contacto - BROADCAST'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
