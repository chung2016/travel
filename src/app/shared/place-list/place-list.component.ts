import { Component, Input } from '@angular/core';
import { PlaceListConfig } from 'src/app/core/models/place-list-config';
import { PlaceService } from 'src/app/core/services';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss']
})
export class PlaceListComponent {
  constructor(
    private placeService: PlaceService
  ) { }
  @Input()
  set config(config: PlaceListConfig) {
    this.query = config;
    this.runQuery();
  }
  query: PlaceListConfig;
  places: any = {};
  loading = false;

  runQuery() {
    
    this.places = [];
    this.loading = true;
    this.placeService.getByUserId(this.query.filters.author)
    .subscribe(places => {
      this.loading = false;
      this.places = places;
    });
  }
}
