import { Category } from './../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { MaterialService } from '../shared/classes/material.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
  categories$: Observable<Category[]> = of([])

  constructor(
    private category: CategoriesService,
    private material: MaterialService
  ) { }

  ngOnInit(): void {
    this.categories$ = this.category.fetch()
  }

}
