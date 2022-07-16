import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { PlaceService } from 'src/app/core/services/place.service';
import { AlertService, AuthenticationService } from 'src/app/core/services';
import { Place, User } from 'src/app/core/models';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/core/services/upload.service';

@Component({
  selector: 'app-place-create',
  templateUrl: './place-create.component.html',
  styleUrls: ['./place-create.component.scss']
})
export class PlaceCreateComponent implements OnInit {
  place: Place = {} as Place;

  data : any = {};
  createPlaceForm: UntypedFormGroup;
  loading = false;
  submitted = false;
  currentUser: User;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private placeService: PlaceService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private uploadService: UploadService,
  ) { }

  ngOnInit() {
    this.createPlaceForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      location: ['', Validators.required],
      type: ['Relax'],
      description: [''],
      authorComment: [''],
    });
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x, err => console.log(err));
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
        err => {
          this.alertService.error(err);
          this.loading = false;
        });
  }

  handleFileInput(files: FileList) {
    this.loading = true;
    this.uploadService.upload(files.item(0)).subscribe(
      data => {
        this.place.photo = data.file;
        this.loading = false;
      }, err => {
        this.alertService.error(err);
        this.loading = false;
      }
    )
  }

  updatePlace(values: Object) {
    Object.assign(this.place, values);
  }

}
