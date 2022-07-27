import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-place-item',
  templateUrl: './place-item.component.html',
  styleUrls: ['./place-item.component.scss'],
})
export class PlaceItemComponent implements OnInit {
  @Input() place = {
    photo: '',
    author: {},
    name: '',
    location: '',
    createdAt: '',
    id: '',
  }

  constructor() {}

  ngOnInit(): void {}
}
