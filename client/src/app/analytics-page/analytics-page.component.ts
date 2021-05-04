import { Subscription } from 'rxjs';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { CategoryScale, Chart, ChartConfiguration, LinearScale, LineController, LineElement, PointElement } from 'chart.js'

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('revenue') revenueCanvasRef!: ElementRef
  @ViewChild('order') orderCanvasRef!: ElementRef

  averageSum = 0
  pending = true
  aSub!: Subscription

  constructor(
    private service: AnalyticsService
  ) { }


  ngOnDestroy(): void {
    if (this.aSub) this.aSub.unsubscribe()
  }

  ngAfterViewInit(): void {
    const revenueConfig: any = {
      label: 'Выручка',
      color: 'rgb(255, 99, 132)'
    }

    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54, 162, 232)'
    }


    this.aSub = this.service.getAnalytics()
      .subscribe(res => {
        this.averageSum = res.averageSum

        revenueConfig.labels = res.chart.map(item => item.label)
        revenueConfig.data = res.chart.map(item => item.revenue)

        orderConfig.labels = res.chart.map(item => item.label)
        orderConfig.data = res.chart.map(item => item.order)

        const revenueCtx = this.revenueCanvasRef.nativeElement.getContext('2d')
        revenueCtx.canvas.height = '300px'
        const orderCtx = this.orderCanvasRef.nativeElement.getContext('2d')
        orderCtx.canvas.height = '300px'

        Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement)
        // tslint:disable-next-line: no-unused-expression
        new Chart(revenueCtx, createChartConfig(revenueConfig))
        // tslint:disable-next-line: no-unused-expression
        new Chart(orderCtx, createChartConfig(orderConfig))

        this.pending = false
      })
  }
}


function createChartConfig(config: any) {
  const conf: ChartConfiguration = {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels: config.labels,
      datasets: [
        {
          label: config.label,
          data: config.data,
          borderColor: config.color,
          stepped: false,
          fill: false
        }
      ]
    }
  }
  return conf
}