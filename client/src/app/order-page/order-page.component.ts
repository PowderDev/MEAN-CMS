import { Order, OrderListElement } from './../shared/interfaces';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { IModal, MaterialService } from '../shared/classes/material.service'
import { OrderListService } from './order-list.service'
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  providers: [OrderListService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef!: ElementRef
  modal!: IModal
  isRoot!: boolean
  pending = false

  constructor(
    private router: Router,
    private material: MaterialService,
    public order: OrderListService,
    private orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  ngAfterViewInit() {
    this.modal = this.material.initModal(this.modalRef)
  }

  open() {
    this.material.dismissToasts()
    this.modal.open()
  }

  cancel() {
    this.modal.close()
  }

  submit() {
    this.pending = true
    const list = this.order.list
      .map(item => {
        delete item._id
        return item
      })
    const newOrder: Order = {
      list
    }

    this.orderService.create(newOrder)
      .subscribe(
        order => {
          this.material.toast(`Order №${order.order} was successfully created`, 'success')
        },
        err => this.material.toast(err.error.message),
        () => {
          this.modal.close()
          this.order.clear()
        }
      )

    this.modal.close()
    this.pending = false
  }

  removeModalItem(item: OrderListElement) {
    this.order.remove(item)
  }
}
