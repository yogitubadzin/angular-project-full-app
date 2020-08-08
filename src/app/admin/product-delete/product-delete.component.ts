import { ProductGlobalService } from './../../core/product-global.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss'],
})
export class ProductDeleteComponent implements OnInit {
  showSummary: boolean;
  showError: boolean;
  productId: string;

  constructor(
    private productGlobalService: ProductGlobalService,
    public dialogRef: MatDialogRef<ProductDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: string
  ) {
    this.productId = this.dialogData;
  }

  ngOnInit(): void {}

  deleteProduct() {
    this.productGlobalService.delete(this.productId).subscribe(
      () => {
        this.showError = false;
        this.dialogRef.close();
      },
      () => {
        this.showError = true;
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
