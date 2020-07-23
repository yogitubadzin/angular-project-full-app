import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  map,
  startWith,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  @Output()
  searchValue = new EventEmitter<String>();
  queryField: FormControl = new FormControl();

  constructor() {}

  ngOnInit(): void {
    this.queryField.valueChanges
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
}
