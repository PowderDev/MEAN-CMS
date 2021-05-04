import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Event, Params, Router } from '@angular/router';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Category } from 'src/app/shared/interfaces';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  isNew = true
  form!: FormGroup
  image!: File
  imagePreview: any
  category!: Category

  @ViewChild('input') inputRef!: ElementRef

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private material: MaterialService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required)
    })

    this.form.disable()

    this.route.params
      .pipe(
        switchMap(params => {
          if (params.id) {
            this.isNew = false
            return this.categoryService.fetchById(params.id)
          }
          else {
            return of(null)
          }
        })
      )
      .subscribe(
        category => {
          if (category) {
            this.category = category
            this.form.patchValue({ name: category.name })
            this.imagePreview = category.imageSrc
            this.material.updateTextInput()
          }
          this.form.enable()
        },
        err => this.material.toast(err.error.message)
      )
  }

  submit() {
    if (this.isNew) {
      const name = this.form.value.name
      this.categoryService.create(name, this.image)
        .subscribe((category: any) => {
          this.isNew = false
          this.material.toast('Category was successfully created', 'success')
          this.router.navigate([`/categories/${category._id}`])
        })
    } else {
      const name = this.form.value.name
      this.categoryService.update(this.category._id, name, this.image)
        .subscribe(() => {
          this.isNew = false
          this.material.toast('Category was successfully updated', 'success')
        })
    }
  }

  trigerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }

  deleteCategory() {
    const answer = confirm('Are you sure that you want to delete' + this.category.name + 'category')

    if (answer) {
      this.categoryService.remove(this.category._id)
        .subscribe((res) => {
          this.router.navigate(['/categories'])
        })
    }
  }

}
