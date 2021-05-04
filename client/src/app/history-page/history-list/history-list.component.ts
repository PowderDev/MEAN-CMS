import { OrderService } from './../../shared/services/order.service';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/shared/interfaces';
import { IModal, MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() orders: Order[] = []
  @ViewChild('modal') modalRef!: ElementRef
  modal!: IModal

  selectedOrder!: Order

  constructor(
    private material: MaterialService
  ) { }

  ngOnDestroy(): void {
    this.modal.destroy()
  }
  ngAfterViewInit(): void {
    this.modal = this.material.initModal(this.modalRef)
  }

  ngOnInit(): void {
  }

  selectOrder(order: Order) {
    this.selectedOrder = order
    this.modal.open()
  }

  closeModal() {
    this.modal.close()
  }

  computePrice(order: Order): number {
    return order.list.reduce((acc, item) => {
      acc += item.cost
      return acc
    }, 0)
  }
}
