import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  _MatTableDataSource,
  MatTableDataSource,
} from '@angular/material/table';
import { List_Product } from 'src/app/contracts/list_product';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';

import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private dialogService: DialogService
  ) {}

  displayedColumns: string[] = [
    'name',
    'stock',
    'price',
    'photos',
    'delete',
    'edit',
  ];
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProduct() {
    const allProducts: {
      totalProductCaunt: Number | any;
      products: List_Product[];
    } = await this.productService.read(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => console.log('liste geldi'),
      (errorMessage) => console.log('liste yüklenemedi')
    );
    this.dataSource = new MatTableDataSource<List_Product>(
      allProducts.products
    );
    this.paginator.length = allProducts.totalProductCaunt;
  }
  // delete(id, event) {
  //   const img: HTMLImageElement = event.srcElement;
  //   $(img.parentElement.parentElement).fadeOut(2000);
  // }

  /////////////////////////////////

  addProductImages(id: string) {
    this.dialogService.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: id,
      options: {
        width: '1400px',
      },
    });
  }
  async pageChanged() {
    await this.getProduct();
  }
  async ngOnInit() {
    await this.getProduct();
  }
}
