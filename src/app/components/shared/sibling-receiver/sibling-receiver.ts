import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationService } from '../../../services/communication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sibling-receiver',
  templateUrl: './sibling-receiver.html',
  styleUrl: './sibling-receiver.scss',
  standalone: true,
  imports: [CommonModule]
})
export class SiblingReceiver implements OnInit, OnDestroy {
  receivedMessages: string[] = [];
  private subscription: Subscription | null = null;

  constructor(private communicationService: CommunicationService) {}

  ngOnInit(): void {
    this.subscription = this.communicationService.notifications$.subscribe(message => {
      if (message) {
        this.receivedMessages.unshift(message);
        if (this.receivedMessages.length > 5) {
          this.receivedMessages = this.receivedMessages.slice(0, 5);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
