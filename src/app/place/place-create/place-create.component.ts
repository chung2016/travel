import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlaceService } from 'src/app/core/services/place.service';
import { AlertService, AuthenticationService } from 'src/app/core/services';
import { Place, User } from 'src/app/core/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-create',
  templateUrl: './place-create.component.html',
  styleUrls: ['./place-create.component.scss']
})
export class PlaceCreateComponent implements OnInit {
  place: Place = {} as Place;

  data : any = {};
  createPlaceForm: FormGroup;
  loading = false;
  submitted = false;
  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private placeService: PlaceService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.createPlaceForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      location: ['', Validators.required],
      description: [''],
      authorComment: [''],
    });
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get f() { return this.createPlaceForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.createPlaceForm.invalid) {
      return;
    }

    this.loading = true;
    
    this.place.author = this.currentUser;
    this.updatePlace(this.createPlaceForm.value);
    this.placeService.create(this.place)
      .subscribe(
        data => {
          this.data = data;

          this.alertService.success('Create successful', true);
          this.router.navigate(['/place/'+ this.data._id]);
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  updatePlace(values: Object) {
    Object.assign(this.place, values);
  }

}
