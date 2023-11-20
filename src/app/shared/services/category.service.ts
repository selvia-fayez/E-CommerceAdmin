import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category, Item } from '../interfaces.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories: any[] = [];
  constructor() {
    this.categories = JSON.parse(localStorage.getItem('categories') || '[]');
  }

  getCategoryById(id: number): Observable<Category> {
    const category = this.categories.find(
      (category: any) => category.id === id
    );
    return of(category);
  }

  getChildrenCategories(parentId: number): Observable<Category[]> {
    const children = this.categories.filter(
      (category: any) => category.parentId === parentId
    );
    return of(children);
  }
}
