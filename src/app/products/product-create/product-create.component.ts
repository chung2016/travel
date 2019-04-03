import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, ProductService } from '../../_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.sass']
})
export class ProductCreateComponent implements OnInit {
  createProductForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.createProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  get f() { return this.createProductForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.createProductForm.invalid) {
      return;
    }
    this.loading = true;
    this.productService
      .create(this.createProductForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Add successful', true);
          this.router.navigate(['/products']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

}
