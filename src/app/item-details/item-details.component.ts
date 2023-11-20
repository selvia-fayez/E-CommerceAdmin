import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Item } from '../shared/interfaces.model';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
  Categories: Category[] = [];
  Items: Item[] = [];
  item: any;
  category: any;
  parent: any;
  categoryChain: Category[] = [];
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    if (JSON.parse(localStorage.getItem('categories')!) !== null) {
      this.Categories = JSON.parse(localStorage.getItem('categories')!);
    }
    if (JSON.parse(localStorage.getItem('items')!) !== null) {
      this.Items = JSON.parse(localStorage.getItem('items')!);
    }
  }
  ngOnInit(): void {
    let { id } = this._ActivatedRoute.snapshot.params;
    this.item = this.Items.find((item) => item.id == id);
    this.getCategoryChain(this.item.categoryId);
  }
  getCategoryChain(categoryId: number) {
    this.categoryService.getCategoryById(categoryId).subscribe((category) => {
      this.categoryChain.unshift(category);
      if (category.parentId !== null) {
        this.getCategoryChain(category.parentId);
      }
    });
  }
}
