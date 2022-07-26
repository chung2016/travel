import { Component, OnInit } from '@angular/core'
import { PlaceListConfig } from '@v1/core/models'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  placeListConfig: PlaceListConfig = {
    filters: {},
  }
  constructor() {}

  ngOnInit() {}
}
