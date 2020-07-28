import { AuthService } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  isLoggedIn: boolean;
  isLoggedInSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn.subscribe(
      (result) => {
        this.isLoggedIn = result;
      }
    );

    this.authService.fetchLogin();
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
  }
}
