import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, Item } from '../shared/interfaces.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  visibleCategory: boolean = false;
  parentOptions: any[] = [];
  Categories: Category[] = [];

  visibleItem: boolean = false;
  categoryOptions: any[] = [];
  Items: Item[] = [];

  constructor() {
    if (JSON.parse(localStorage.getItem('categories')!) !== null) {
      this.Categories = JSON.parse(localStorage.getItem('categories')!);
    }
    if (JSON.parse(localStorage.getItem('items')!) !== null) {
      this.Items = JSON.parse(localStorage.getItem('items')!);
    }
  }
  ngOnInit(): void {
    this.updateOptions();
  }
  addCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    parentId: new FormControl(''),
  });
  addItemForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
  });
  updateOptions() {
    for (let i = 0; i < this.Categories.length; i++) {
      this.parentOptions[i] = {
        id: this.Categories[i].id,
        name: this.Categories[i].name,
      };
    }
    this.categoryOptions = this.parentOptions;
  }

  AddCategory(formData: FormGroup) {
    let categoryData = {
      id: this.Categories ? this.Categories.length : 0,
      ...formData.value,
      parentId: formData.value.parentId ? formData.value.parentId.id : null,
    };
    this.Categories.push(categoryData);
    localStorage.setItem('categories', JSON.stringify(this.Categories));
    this.updateOptions();
    this.addCategoryForm.reset();
  }
  AddItem(formData: FormGroup) {
    let itemData = {
      id: this.Items ? this.Items.length : 0,
      ...formData.value,
      categoryId: formData.value.categoryId
        ? formData.value.categoryId.id
        : null,
    };
    this.Items.push(itemData);
    localStorage.setItem('items', JSON.stringify(this.Items));
    this.addItemForm.reset();
  }
}
