import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { User, PlaceListConfig } from '@v1/core/models'

@Component({
  selector: 'app-profile-places',
  templateUrl: './profile-places.component.html',
  styleUrls: ['./profile-places.component.scss'],
})
export class ProfilePlacesComponent implements OnInit {
  user: User
  placeListConfig: PlaceListConfig = {
    filters: {},
  }
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.parent.data.subscribe((data) => {
      this.user = data.profile
      this.placeListConfig.filters.author = this.user.id
    }, console.error)
  }
}
