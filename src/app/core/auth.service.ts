import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private logInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.logInSubject.asObservable();

  constructor() {}

  public fetchLogin(): Observable<boolean> {
    return of(true);
  }
}
