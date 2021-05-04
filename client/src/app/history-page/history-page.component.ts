import { Subscription } from 'rxjs';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IModal, MaterialService } from '../shared/classes/material.service';
import { OrderService } from '../shared/services/order.service';
import { Filter, Order } from '../shared/interfaces';

const STEP = 3

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {
  isFilterVisible = false

  @ViewChild('tooltip') tooltipRef!: ElementRef
  tooltip!: IModal
  oSub!: Subscription
  loading = false
  reLodaing = false

  orders: Order[] = []
  offset = 0
  limit = STEP
  noMoreOrders = false
  filter: Filter = {}

  constructor(
    private material: MaterialService,
    private orderService: OrderService
  ) { }

  ngAfterViewInit(): void {
    this.tooltip = this.material.initTooltip(this.tooltipRef)
  }
  ngOnDestroy(): void {
    this.tooltip.destroy()
    if (this.oSub) this.oSub.unsubscribe()
  }

  ngOnInit(): void {
    this.reLodaing = true
    this.fetch()
  }


  private fetch() {
    const settings = {
      offset: this.offset,
      limit: this.limit
    }

    const params = Object.assign({}, settings, this.filter)

    this.oSub = this.orderService.fetch(params)
      .subscribe(orders => {
        this.orders = this.orders.concat(orders)
        this.noMoreOrders = orders.length < STEP || this.orders[this.orders.length - 1].order === 1

        this.loading = false
        this.reLodaing = false
      })
  }

  loadMore() {
    this.loading = true
    this.offset += STEP
    this.fetch()
  }

  applyFilter(filter: Filter) {
    this.offset = 0
    this.orders = []
    this.filter = filter
    this.reLodaing = true

    this.fetch()
  }

  isFiltered() {
    return Object.keys(this.filter).length > 0
  }
}
