import { Component, OnInit } from '@angular/core'
import { Validators, FormGroup, FormControl } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { finalize } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Place, User } from '@v1/core/models'
import { PlaceService, AuthenticationService, AlertService } from '@v1/core/services'
import { UploadService } from '@v1/core/services/upload.service'

@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.component.html',
  styleUrls: ['./place-edit.component.scss'],
})
export class PlaceEditComponent implements OnInit {
  placeTypeOptions = environment.placeTypeOptions

  place: Place = {} as Place
  editPlaceForm = new FormGroup({
    authorComment: new FormControl(''),
    name: new FormControl('', Validators.compose([Validators.required])),
    location: new FormControl('', Validators.compose([Validators.required])),
    type: new FormControl('Relax'),
    description: new FormControl(''),
  })
  loading = false
  submitted = false
  currentUser: User
  data: any = {}
  constructor(
    private router: Router,
    private placeService: PlaceService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private uploadService: UploadService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.placeService.getById(params['id']).subscribe((res) => {
        this.place = res
        this.editPlaceForm.patchValue(res)
      }, console.error)
    })
    this.authenticationService.currentUser.subscribe((x) => (this.currentUser = x), console.error)
  }
  get f() {
    return this.editPlaceForm.controls
  }
  onSubmit() {
    this.submitted = true

    if (this.editPlaceForm.invalid) {
      return
    }

    this.loading = true

    this.place.author = this.currentUser
    Object.assign(this.place, this.editPlaceForm.value)
    this.placeService
      .update(this.place)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data) => {
          this.data = data

          this.alertService.success('Update successful', true)
          this.router.navigate([`/v1/place/${this.data._id}`])
        },
        (err) => {
          this.alertService.error(err)
        }
      )
  }

  handleFileInput(files: FileList) {
    this.loading = true
    this.uploadService
      .upload(files.item(0))
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data) => {
          this.place.photo = data.file
        },
        (err) => {
          this.alertService.error(err)
        }
      )
  }
}
