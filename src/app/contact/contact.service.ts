import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message';
import { Injectable } from '@angular/core';

@Injectable()
export class ContactService {
  private baseUrl = '/api/contact';

  constructor(private httpService: HttpClient) {}

  public sendMessage(message: Message) {
    return this.httpService.post<Message>(this.baseUrl, message);
  }
}
