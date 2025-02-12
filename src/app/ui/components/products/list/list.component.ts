import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from 'src/app/contracts/base_url';
import { List_Product } from 'src/app/contracts/list_product';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService
  ) {}

  currentPageNo: number;
  totalProductCaunt: number;
  totalPageCaunt: number;
  products: List_Product[];
  pageList: number[] = [];
  baseUrl: BaseUrl;

  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();

    this.activatedRoute.params.subscribe(async (params) => {
      this.currentPageNo = parseInt(params['pageNo'] ?? 1);
      const data = await this.productService.read(
        this.currentPageNo - 1,
        12,
        () => {},
        (errorMessage) => {}
      );
      this.products = data.products;
      this.products = this.products.map<List_Product>((p) => {
        const listProduct: List_Product = {
          id: p.id,
          createdDate: p.createdDate,
          imagePath: `${
            p.productImageFiles.length
              ? p.productImageFiles.find((p) => p.showCase).path
              : ''
          }`,
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          productImageFiles: p.productImageFiles,
        };
        return listProduct;
      });

      this.totalProductCaunt = data.totalProductCaunt;
      this.totalPageCaunt = Math.ceil(this.totalProductCaunt / 12);
      this.pageList = [];

      if (this.currentPageNo - 3 <= 0) {
        for (let i = 1; i <= 7; i++) {
          this.pageList.push(i);
        }
      } else if (this.currentPageNo + 3 >= this.totalPageCaunt) {
        for (let i = this.totalPageCaunt - 6; i <= this.totalPageCaunt; i++) {
          this.pageList.push(i);
        }
      } else {
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++) {
          this.pageList.push(i);
        }
      }
    });
  }
}
