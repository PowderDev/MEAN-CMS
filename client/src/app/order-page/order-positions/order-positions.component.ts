import { Position } from './../../shared/interfaces';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router';
import { PositionService } from 'src/app/shared/services/position.service';
import { OrderListService } from '../order-list.service';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<Position[]> = of([])

  constructor(
    private route: ActivatedRoute,
    private positionService: PositionService,
    private order: OrderListService,
    private material: MaterialService
  ) {
  }

  ngOnInit() {
    this.positions$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.positionService.fetch(params.id)
        }),
        map((positions: Position[]) => {
          return positions.map(pos => {
            pos.quantity = 1
            return pos
          })
        })
      )
  }

  addToOrder(pos: Position) {
    this.material.toast(pos.name + ' added x' + pos.quantity)
    this.order.add(pos)
  }
}
