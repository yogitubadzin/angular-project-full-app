import { Message } from './../../models/message';
import { Component, OnInit } from '@angular/core';
import { AdminContactService } from '../admin-contact.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss'],
})
export class MessageDetailsComponent implements OnInit {
  message: Message;

  constructor(
    private adminContactService: AdminContactService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const messageId = this.route.snapshot.params['id'];

    this.adminContactService
      .getmessageById(messageId)
      .subscribe((result) => {
        this.message = result;
      });
  }
}
