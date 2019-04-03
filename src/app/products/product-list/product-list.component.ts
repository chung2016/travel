import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Product } from '../../_models';
import { ProductService } from '../../_services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {
  loading = false;
  products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadAllProducts();
  }

  deleteProduct(id: number) {
    this.loading = true;
    this.productService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.loading = false;
        this.loadAllProducts();
      });
  }

  private loadAllProducts() {
    this.productService
      .getAll()
      .pipe(first())
      .subscribe(products => {
        this.products = products;
      });
  }
}
