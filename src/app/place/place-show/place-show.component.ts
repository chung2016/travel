import { Component, OnInit } from '@angular/core';
import { PlaceService } from 'src/app/core/services';
import { ActivatedRoute } from '@angular/router';
import { Place } from 'src/app/core/models';

@Component({
  selector: 'app-place-show',
  templateUrl: './place-show.component.html',
  styleUrls: ['./place-show.component.scss']
})
export class PlaceShowComponent implements OnInit {
  place: Place;
  loading = true;
  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService,
  ) { }

  ngOnInit() {
    this.placeService.getById(this.route.snapshot.params['id'])
      .subscribe(place => {
        this.place = place;
        this.loading = false;
      }, err => {
        console.log(err);
        this.loading = false;
      });
  }

}
