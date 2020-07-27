import { Directive, Input, HostBinding } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appInputRef]',
})
export class InputRefDirective {
  @Input('appInputRef') control: AbstractControl;
  @HostBinding('class.is-invalid') isInvalid = false;

  constructor() {}

  ngOnInit() {}

  public get formControl() {
    return this.control;
  }

  public setIsInvalid(isInvalid){
    this.isInvalid = isInvalid;
  }
}
