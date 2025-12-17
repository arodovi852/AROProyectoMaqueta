import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';
import { Toast } from './components/shared/toast/toast';
import { Spinner } from './components/shared/spinner/spinner';
import { Breadcrumbs } from './components/shared/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Toast, Spinner, Breadcrumbs],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('AROProyectoMaqueta');
}
