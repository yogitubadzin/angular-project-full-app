import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { InputRefDirective } from './input-ref.directive';

@NgModule({
  declarations: [
    InputComponent,
    PageNotFoundComponent,
    NavigationComponent,
    InputRefDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    InputComponent,
    PageNotFoundComponent,
    NavigationComponent,
    InputRefDirective
  ],
})
export class SharedModule {}
