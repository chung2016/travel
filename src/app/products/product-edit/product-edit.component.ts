import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AlertService, ProductService } from '../../_services';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.sass']
})
export class ProductEditComponent implements OnInit {
  product: any = {};

  editProductForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.editProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.productService.getById(params['id']).subscribe(product => {
        this.product = product;
      });
    });
  }

  get f() {
    return this.editProductForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.editProductForm.invalid) {
      return;
    }
    this.loading = true;
    Object.assign(this.product, this.editProductForm.value);
    this.productService
      .update(this.product)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Update successful');
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

}
