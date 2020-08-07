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
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent implements OnInit {
  private queryFieldSubscription: Subscription;
  @Output() searchValue = new EventEmitter<string>();
  @Input() placeholder: string;
  queryField = new FormControl();

  constructor() {}

  ngOnInit(): void {
    this.queryFieldSubscription = this.queryField.valueChanges
      .pipe(startWith(''), debounceTime(400), distinctUntilChanged())
      .subscribe((value) => this._filter(value));
  }

  ngDestroy() {
    this.queryFieldSubscription.unsubscribe();
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    this.searchValue.emit(filterValue);
  }
}
