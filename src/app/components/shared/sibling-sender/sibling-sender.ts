import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationService } from '../../../services/communication.service';
import { Button } from '../button/button';

@Component({
  selector: 'app-sibling-sender',
  templateUrl: './sibling-sender.html',
  styleUrl: './sibling-sender.scss',
  standalone: true,
  imports: [CommonModule, Button]
})
export class SiblingSender {
  messageCount = 0;

  constructor(private communicationService: CommunicationService) {}

  sendMessage(): void {
    this.messageCount++;
    const message = `Mensaje ${this.messageCount} desde Componente Emisor`;
    this.communicationService.sendNotification(message);
  }
}
