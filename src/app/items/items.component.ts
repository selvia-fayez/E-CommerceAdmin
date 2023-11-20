import { Component } from '@angular/core';
import { Category, Item } from '../shared/interfaces.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent {
  Categories: Category[] = [];
  Items: Item[] = [];
  constructor() {
    if (JSON.parse(localStorage.getItem('categories')!) !== null) {
      this.Categories = JSON.parse(localStorage.getItem('categories')!);
    }
    if (JSON.parse(localStorage.getItem('items')!) !== null) {
      this.Items = JSON.parse(localStorage.getItem('items')!);
    }
  }
}
