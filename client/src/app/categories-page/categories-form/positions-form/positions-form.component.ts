import { Position } from './../../../shared/interfaces';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PositionService } from 'src/app/shared/services/position.service';
import { IModal, MaterialService } from 'src/app/shared/classes/material.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  // tslint:disable-next-line: no-input-rename
  @Input('categoryId') categoryId = ''
  @ViewChild('modal') modalRef!: ElementRef
  positions: Position[] = []
  loading = false
  modal!: IModal
  form!: FormGroup
  isNew!: boolean
  positionId!: string

  constructor(
    private positionService: PositionService,
    private material: MaterialService
  ) { }

  ngOnDestroy(): void {
    this.modal.destroy()
  }

  ngAfterViewInit(): void {
    this.modal = this.material.initModal(this.modalRef)
  }

  ngOnInit(): void {
    this.loading = true
    this.positionService.fetch(this.categoryId)
      .subscribe(positions => {
        this.loading = false
        this.positions = positions
      })

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      cost: new FormControl('', [Validators.required, Validators.min(1)]),
    })
  }

  onSelectPosition(position: Position) {
    this.isNew = false
    this.positionId = position._id || ''
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    })
    this.modal.open()
    this.material.updateTextInput()
  }

  onAddPosition() {
    this.isNew = true
    this.form.reset()
    this.modal.open()
  }

  onCancel() {
    this.modal.close()
  }

  submit() {
    if (this.form.invalid) return

    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }

    this.form.disable()

    const completed = () => {
      this.form.enable()
      this.form.reset()
    }

    if (this.isNew) {
      this.positionService.create(newPosition)
        .subscribe(
          position => {
            this.material.toast('Position was successfully created', 'success')
            this.positions.push(position)
          },
          error => this.material.toast(error.error.message),
          completed
        )
    }
    else {
      newPosition._id = this.positionId
      this.positionService.update(newPosition)
        .subscribe(
          position => {
            this.material.toast('Position was successfully updated', 'success')
            const idx = this.positions.findIndex(p => p._id === position._id)
            this.positions[idx] = position
          },
          error => this.material.toast(error.error.message),
          completed
        )
    }




  }

  onDelete(position: Position, event: MouseEvent) {
    event.stopPropagation()
    const answer = window.confirm(`Delete ${position.name}`)

    if (answer) {
      this.positionService.remove(position)
        .subscribe(
          () => {
            const idx = this.positions.findIndex(p => p._id === p._id)
            this.positions.splice(idx, 1)
            this.material.toast('Deleted')
          },
          error => this.material.toast(error.error.message)
        )
    }
  }

}
