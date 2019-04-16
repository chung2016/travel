import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/core/models';

@Component({
  selector: 'app-place-preview',
  templateUrl: './place-preview.component.html',
  styleUrls: ['./place-preview.component.scss']
})
export class PlacePreviewComponent implements OnInit {
  @Input() place: Place;
  constructor() { }

  ngOnInit() {
    console.log(this.place)
  }

}
