import { InputRefDirective } from './../input-ref.directive';
import {
  Component,
  OnInit,
  Input,
  ContentChild,
  HostListener,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() label: string;
  control: AbstractControl;
  @ContentChild(InputRefDirective) input: InputRefDirective;

  constructor() {}

  ngOnInit() {}

  showErrors() {
    if (this.input.formControl === null) {
      return;
    }

    const { dirty, touched, errors } = this.input.formControl;
    return dirty && touched && errors != null;
  }

  @HostListener('change', ['$event'])
  @HostListener('focusout', ['$event'])
  @HostListener('click', ['$event'])
  @HostListener('onkeyup', ['$event'])
  toggleOpen(event: Event) {
    this.input.setIsInvalid(this.showErrors());
  }
}
