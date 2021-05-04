import { Observable } from 'rxjs';
import { AnalyticsService } from './../shared/services/analytics.service';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Overview } from '../shared/interfaces';
import { IModal, MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tapTarget') tapTargetRef!: ElementRef

  overview$!: Observable<Overview>
  tapTarget!: IModal

  yesterday = new Date()

  constructor(
    private service: AnalyticsService,
    private material: MaterialService
  ) { }

  ngOnDestroy(): void {
    this.tapTarget.destroy()
  }
  ngAfterViewInit(): void {
    this.tapTarget = this.material.initTapTarget(this.tapTargetRef)
  }

  ngOnInit(): void {
    this.overview$ = this.service.getOverview()

    this.yesterday.setDate(this.yesterday.getDate() - 1)
  }

  openInfo() {
    this.tapTarget.open()
  }

}
