import { Component, Input } from '@angular/core'
import { catchError, map, startWith, switchMap } from 'rxjs/operators'
import { PlaceListConfig } from '@v1/core/models'
import { PlaceService } from '@v1/core/services'
import { BehaviorSubject, Observable, of } from 'rxjs'

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss'],
})
export class PlaceListComponent {
  @Input()
  set config(config: PlaceListConfig) {
    this.author = config.filters.author
  }
  author = null
  places$: Observable<Object>

  readonly reload$ = new BehaviorSubject(null)

  constructor(private placeService: PlaceService) {
    this.places$ = this.reload$.pipe(
      switchMap(() => {
        const request = this.author
          ? this.placeService.getByUserId(this.author)
          : this.placeService.getAll()
        return request
      }),
      map((val: []) => ({
        loading: false,
        value: val.reduce((acc, curr, index) => {
          if (index % 3 === 0) acc.push([])
          acc[acc.length - 1].push(curr)
          return acc
        }, []),
      })),
      catchError((error) => {
        return of({
          loading: false,
          error,
        })
      }),
      startWith({ loading: true })
    )
  }
}
