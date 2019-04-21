import { Component, OnInit } from '@angular/core';
import { Place, User } from 'src/app/core/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PlaceService, AuthenticationService, AlertService } from 'src/app/core/services';
import { UploadService } from 'src/app/core/services/upload.service';

@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.component.html',
  styleUrls: ['./place-edit.component.scss']
})
export class PlaceEditComponent implements OnInit {
  place: Place = {} as Place;
  editPlaceForm: FormGroup;
  loading = false;
  submitted = false;
  currentUser: User;
  data: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private placeService: PlaceService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private uploadService: UploadService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.placeService.getById(params['id']).subscribe(res => {
        this.place = res;
      });
    });

    this.editPlaceForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      location: ['', Validators.required],
      description: [''],
      authorComment: [''],
    });
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x, err => console.log(err));
  }
  get f() { return this.editPlaceForm.controls; }
  onSubmit() {
    this.submitted = true;

    if (this.editPlaceForm.invalid) {
      return;
    }

    this.loading = true;

    this.place.author = this.currentUser;
    this.updatePlace(this.editPlaceForm.value);
    this.placeService.update(this.place)
      .subscribe(
        data => {
          this.data = data;

          this.alertService.success('Update successful', true);
          this.router.navigate(['/place/' + this.data._id]);
          this.loading = false;
        },
        err => {
          this.alertService.error(err);
          this.loading = false;
        });
  }

  updatePlace(values: Object) {
    Object.assign(this.place, values);
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

}
