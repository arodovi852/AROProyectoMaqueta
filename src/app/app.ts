import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';
import { Toast } from './components/shared/toast/toast';
import { AlertContainer } from './components/shared/alert-container/alert-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Toast, AlertContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('AROProyectoMaqueta');
}
