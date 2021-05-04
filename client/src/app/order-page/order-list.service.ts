import { Injectable } from '@angular/core'
import { OrderListElement, Position } from '../shared/interfaces';

@Injectable()
export class OrderListService {
  public list: OrderListElement[] = []
  public price = 0

  add(position: any) {
    const element: OrderListElement = {
      name: position.name,
      cost: position.cost * position.quantity,
      quantity: position.quantity,
      _id: position._id
    }

    const candidate = this.list.find(e => e._id === element._id)

    if (candidate) {
      candidate.quantity += element.quantity
      candidate.cost = candidate.cost * candidate.quantity
    }
    else {
      this.list.push(element)
    }

    this.computePrice()
  }

  remove(item: OrderListElement) {
    const idx = this.list.findIndex(p => p._id === item._id)
    this.list.splice(idx, 1)

    this.computePrice()
  }

  clear() {
    this.list = []
    this.price = 0
  }

  private computePrice() {
    this.price = this.list.reduce((acc, item) => {
      acc += item.cost
      return acc
    }, 0)
  }
}
