import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Productos } from './pages/productos/productos';
import { Contacto } from './pages/contacto/contacto';
import { DemoComponents } from './pages/demo-components/demo-components';
import { Main } from './pages/main/main';
import { Lists } from './pages/lists/lists';
import { ListInfo } from './pages/list-info/list-info';
import { ListContent } from './pages/list-content/list-content';
import { SearchResult } from './pages/search-result/search-result';
import { Profile } from './pages/profile/profile';
import { SeriesInfo } from './pages/series-info/series-info';

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
    path: 'searchresult',
    component: SearchResult,
    title: 'Search Results - BROADCASTTD'
  },
  {
    path: 'profile',
    component: Profile,
    title: 'Profile - BROADCASTTD'
  },
  {
    path: 'seriesinfo',
    component: SeriesInfo,
    title: 'Series Info - BROADCASTTD'
  },
  {
    path: 'listcontent',
    component: ListContent,
    title: 'List Content - BROADCASTTD'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
