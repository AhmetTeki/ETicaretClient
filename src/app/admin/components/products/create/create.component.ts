import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { error } from 'console';
import { Create_Product } from 'src/app/contracts/create_product';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}
  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: 'upload',
    controller: 'products',
    explanation: 'Resimleri Sürükleyin Veya Seçin',
    accept: '.png, .jpeg, jpg',
  };
  create(
    name: HTMLInputElement,
    price: HTMLInputElement,
    stock: HTMLInputElement
  ) {
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.price = parseInt(price.value);
    create_product.stock = parseFloat(stock.value);

    this.productService.create(create_product);
    (errorMessage) => {
      console.log('yanlışşş');
    };
  }
}
