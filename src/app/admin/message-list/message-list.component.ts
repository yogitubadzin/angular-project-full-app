import { Message } from './../../models/message';
import { AdminContactService } from '../admin-contact.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit {
  private filter: string;
  private messagesSubscription: Subscription;
  messages$: Observable<Message[]>;
  selectedMessageId: string;
  selectedMessageDetailsId: string;
  totalItems$: Observable<number>;
  ismessageChanged: boolean;
  currentPage = 1;
  limitSize = 5;

  constructor(private adminContactService: AdminContactService) {}

  ngOnInit() {
    this.messages$ = this.adminContactService.messages$;
    this.totalItems$ = this.adminContactService.totalCount$;

    this.messagesSubscription = this.messages$.subscribe((result) => {
      if (result.length === 0) {
        this.setSelectedmessageId(null);
        return;
      }

      this.setSelectedmessageId(result[0].id);
    });

    this.adminContactService.fetchMessages(this.currentPage - 1, this.limitSize);
  }

  onClick(message: Message) {
    this.setSelectedmessageId(message.id);
  }

  filterData(filter: string) {
    this.setFilter(filter);

    this.adminContactService.fetchMessages(
      this.calculateStartPage(),
      this.limitSize,
      this.filter
    );
  }

  pageChanged(page: number): void {
    this.currentPage = page;
    this.filterData(this.filter);
  }

  ngDestroy() {
    this.messagesSubscription.unsubscribe();
  }

  private calculateStartPage() {
    return (this.currentPage - 1) * this.limitSize;
  }

  private setFilter(filter: string) {
    this.filter = filter;
  }

  private setSelectedmessageId(selectedmessageId) {
    this.selectedMessageId = selectedmessageId;
  }
}
