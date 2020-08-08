import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appNotLoggedIn]',
})
export class NotLoggedInDirective {
  subscriptions: Subscription;
  stop$ = new Subject();
  isVisible = false;

  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {
    this.subscriptions = new Subscription();
    this.viewContainerRef.clear();
    this.subscriptions.add(
      this.authService.isLoggedIn$
        .pipe(takeUntil(this.stop$))
        .subscribe((result) => {
          this.viewContainerRef.clear();

          if (!result) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
        })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
