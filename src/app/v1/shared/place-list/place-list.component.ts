import { Component, Input } from '@angular/core'
import { finalize } from 'rxjs/operators'
import { PlaceListConfig } from '@v1/core/models'
import { PlaceService } from '@v1/core/services'

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
  places = []
  loading = true

  private runQuery() {
    if (this.query.filters.author) {
      this.placeService
        .getByUserId(this.query.filters.author)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe((places: any) => {
          this.setPlaces(places)
        }, console.error)
    } else {
      this.placeService
        .getAll()
        .pipe(finalize(() => (this.loading = false)))
        .subscribe((places: any) => {
          this.setPlaces(places)
        }, console.error)
    }
    this.places = []
  }

  setPlaces(places = []) {
    this.places = places.reduce((prev, curr, index) => {
      if (index % 3 === 0) prev.push([])
      prev.at(-1).push(curr)
      return prev
    }, [])
  }
}
