import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DatePicker, MaterialService } from 'src/app/shared/classes/material.service';
import { Filter } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnDestroy, AfterViewInit {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onFilter = new EventEmitter<Filter>()
  @ViewChild('start') startRef!: ElementRef
  @ViewChild('end') endRef!: ElementRef

  order!: number
  start!: DatePicker
  end!: DatePicker

  isValid = true

  constructor(
    private material: MaterialService
  ) { }

  ngOnDestroy(): void {
    this.start.destroy()
    this.end.destroy()
  }
  ngAfterViewInit(): void {
    this.start = this.material.initDatePicker(this.startRef, this.validate.bind(this))
    this.end = this.material.initDatePicker(this.endRef, this.validate.bind(this))
  }

  submitFilter() {
    const filter: Filter = {}

    if (this.order) {
      filter.order = this.order
    }
    if (this.end.date) {
      filter.end = this.end.date
    }
    if (this.start.date) {
      filter.start = this.start.date
    }

    this.onFilter.emit(filter)
  }

  validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true
      return
    }

    this.isValid = this.start.date < this.end.date

  }
}
