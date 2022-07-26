import { Component, Input } from '@angular/core'
import { finalize } from 'rxjs/operators'
import { PlaceListConfig } from 'src/app/core/models/place-list-config'
import { PlaceService } from 'src/app/core/services'

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss'],
})
export class PlaceListComponent {
  constructor(private placeService: PlaceService) {}
  @Input()
  set config(config: PlaceListConfig) {
    this.query = config
    this.runQuery()
  }
  query: PlaceListConfig
  places: any = {}
  loading = true

  runQuery() {
    if (this.query.filters.author) {
      this.placeService
        .getByUserId(this.query.filters.author)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe((places) => {
          this.places = places
        }, console.error)
    } else {
      this.placeService
        .getAll()
        .pipe(finalize(() => (this.loading = false)))
        .subscribe((places) => {
          this.places = places
        }, console.error)
    }
    this.places = []
  }
}
