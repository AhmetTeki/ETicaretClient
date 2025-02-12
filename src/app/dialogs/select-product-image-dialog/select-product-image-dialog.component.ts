import { Component, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { BaseDialog } from '../base/base-dialog';
import { ProductService } from 'src/app/services/common/models/product.service';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { runInThisContext } from 'vm';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.css'],
})
export class SelectProductImageDialogComponent
  extends BaseDialog<SelectProductImageDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService,
    private tostt: ToastrService
  ) {
    super(dialogRef);
  }
  images: List_Product_Image[];
  async ngOnInit() {
    this.images = await this.productService.readImages(this.data as string);
  }

  @Output() options: Partial<FileUploadOptions> = {
    action: 'upload',
    controller: 'products',
    explanation: 'Resimleri Sürükleyin Veya Seçin',
    accept: '.png, .jpeg, jpg',
    queryString: `id=${this.data}`,
  };
  async deleteImage(imageId: string) {
    await this.productService.deleteImage(this.data as string, imageId);
  }
  showCase(imageId: string) {
    this.productService.changeShowCaseImage(
      imageId,
      this.data as string,
      () => {}
    );
  }
}
export enum SelectProductImageState {
  Close,
}
