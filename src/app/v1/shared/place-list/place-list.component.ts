import { Component, Input } from '@angular/core'
import { finalize, map, reduce } from 'rxjs/operators'
import { PlaceListConfig } from '@v1/core/models'
import { PlaceService } from '@v1/core/services'
import { Observable } from 'rxjs'

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
  places$: Observable<Object>
  loading = true

  private runQuery() {
    const request = this.query.filters.author
      ? this.placeService.getByUserId(this.query.filters.author)
      : this.placeService.getAll()
    this.places$ = request.pipe(
      map((val: []) =>
        val.reduce((acc, curr, index) => {
          if (index % 3 === 0) acc.push([])
          acc[acc.length - 1].push(curr)
          return acc
        }, [])
      ),
      finalize(() => (this.loading = false))
    )
  }
}
