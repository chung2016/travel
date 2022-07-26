import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

import { AlertService } from '@v1/core/services'
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  private subscription: Subscription
  message: any

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe((message) => {
      this.message = message
    }, console.error)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
