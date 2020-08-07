import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Message } from '../models/message';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class AdminContactService {
  private baseUrl = '/api/contact';
  private dataStore: { messages: Message[]; totalCount: number } = {
    messages: [],
    totalCount: 0,
  };
  private messagesSubject$ = new BehaviorSubject<Message[]>([]);
  private totalCountSubject$ = new BehaviorSubject<number>(0);
  public messages$ = this.messagesSubject$.asObservable();
  public totalCount$ = this.totalCountSubject$.asObservable();

  constructor(private httpService: HttpClient) {}

  public getmessageById(id: string): Observable<Message> {
    return this.httpService.get<Message>(`${this.baseUrl}/${id}`);
  }

  public fetchMessages(
    startPage: number = null,
    limitSize: number = null,
    searchFilter: string = null
  ) {
    let params = new HttpParams();

    if (startPage !== null) {
      params = params.append('_start', startPage.toString());
    }

    if (limitSize !== null) {
      params = params.append('_limit', limitSize.toString());
    }

    if (searchFilter !== null) {
      params = params.append('q', searchFilter);
    }

    return this.httpService
      .get<Message[]>(this.baseUrl, { params, observe: 'response' })
      .pipe(
        tap((result) => {
          this.dataStore.totalCount = +result.headers.get('x-total-count');
        }),
        map((result): Message[] => {
          return result.body;
        })
      )
      .subscribe((result) => {
        this.dataStore.messages = result;
        this.messagesSubject$.next(this.dataStore.messages);
        this.totalCountSubject$.next(this.dataStore.totalCount);
      });
  }
}
