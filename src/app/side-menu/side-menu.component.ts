import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Category } from '../shared/interfaces.model';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  Categories: Category[] = [];
  items: any;
  constructor(private categoryService: CategoryService) {
    if (JSON.parse(localStorage.getItem('categories')!) !== null) {
      this.Categories = JSON.parse(localStorage.getItem('categories')!);
    }
  }
  ngOnInit() {
    this.items = this.Categories.map((category) => {
      return {
        label: category.name,
        items: [],
        command: () => {
          this.viewChildren(category.id, this.items, this.Categories);
        },
      };
    });
  }
  viewChildren(parentId: number, selecteditems: any, selectedcategories: any) {
    debugger;
    this.categoryService
      .getChildrenCategories(parentId)
      .subscribe((children) => {
        const selectedCategory = selecteditems.find(
          (item: any) =>
            item.label ===
            selectedcategories.find((c: any) => c.id === parentId)?.name
        );
        if (selectedCategory) {
          selectedCategory.items = children.map((child) => {
            // return { label: child.name };
            const childItem: any = {
              label: child.name,
              items: [],
              command: () => {
                this.viewChildren(child.id, selectedCategory.items, children);
              },
            };
            return childItem;
          });
          console.log(selectedCategory);
        }
      });
  }
}
