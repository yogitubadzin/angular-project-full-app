import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Input() showError: boolean;
  @Input() initialProduct: Product;
  @Output() productToSave = new EventEmitter<Product>();

  productForm = this.fb.group({
    name: this.fb.control('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    description: this.fb.control('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(200),
    ]),
    price: this.fb.control('', [
      Validators.required,
      Validators.pattern(/^[0-9]\d*$/),
      Validators.min(1),
      Validators.max(1000),
    ]),
    stockStatus: this.fb.control('', [
      Validators.required,
      Validators.pattern(/^[0-9]\d*$/),
      Validators.min(0),
      Validators.max(1000),
    ]),
    id: this.fb.control('', []),
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.productToSave.emit(this.productForm.value);
  }

  ngOnChanges() {
    if (this.initialProduct !== null) {
      this.productForm.patchValue(this.initialProduct);
    }
  }

  cancel() {

    this.router.navigate(['/products']);
  }

  get id() {
    return this.productForm.get('id');
  }

  get name() {
    return this.productForm.get('name');
  }

  get description() {
    return this.productForm.get('description');
  }

  get price() {
    return this.productForm.get('price');
  }

  get stockStatus() {
    return this.productForm.get('stockStatus');
  }
}
