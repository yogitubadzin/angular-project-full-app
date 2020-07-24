import { HttpClient } from '@angular/common/http';
import { Message } from '../models/Message';
import { ContactModule } from './contact.module';
import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: ContactModule,
// })
@Injectable()
export class ContactService {
  private baseUrl = '/api/contact';

  constructor(private httpService: HttpClient) {}

  public sendMessage(message: Message) {
    return this.httpService.post<Message>(this.baseUrl, message);
  }
}
