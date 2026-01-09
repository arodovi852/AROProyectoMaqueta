import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Productos } from './pages/productos/productos';
import { Contacto } from './pages/contacto/contacto';
import { DemoComponents } from './pages/demo-components/demo-components';
import { Main } from './pages/main/main';
import { Lists } from './pages/lists/lists';
import { ListInfo } from './pages/list-info/list-info';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'BROADCAST - Soluciones tecnológicas innovadoras'
  },
  {
    path: 'main',
    component: Main,
    title: 'BROADCASTTD - Track series. Rate them. See what\'s good.'
  },
  {
    path: 'lists',
    component: Lists,
    title: 'Lists - BROADCASTTD'
  },
  {
    path: 'listinfo',
    component: ListInfo,
    title: 'Create List - BROADCASTTD'
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
    path: 'demo',
    component: DemoComponents,
    title: 'Demo Componentes - BROADCAST'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
