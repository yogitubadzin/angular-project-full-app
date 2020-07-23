import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private baseUrl = '/api/contact';

  constructor(private httpService: HttpClient) {}

  public sendMessage(message: Message) {
    this.httpService.post<Message>(this.baseUrl, message).subscribe();
  }
}
