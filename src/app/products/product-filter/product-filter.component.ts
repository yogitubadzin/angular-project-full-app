import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  map,
  startWith,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  private queryFieldSubscription: Subscription;
  @Output()
  searchValue = new EventEmitter<String>();
  queryField = new FormControl();

  constructor() {}

  ngOnInit(): void {
    this.queryFieldSubscription = this.queryField.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        map((value) => this._filter(value))
      )
      .subscribe();
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    this.searchValue.emit(filterValue);
  }

  ngDestroy(){
    this.queryFieldSubscription.unsubscribe();
  }
}
