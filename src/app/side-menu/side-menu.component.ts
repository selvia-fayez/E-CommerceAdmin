import { Component, Input } from '@angular/core';
import { Category } from '../shared/interfaces.model';
import { CategoryService } from '../shared/services/category.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  @Input() Categories: Category[] = [];
  items: MenuItem[] | undefined;

  constructor(private categoryService: CategoryService) {}
  ngOnInit() {
    this.items = this.mapCategories(this.Categories);
    console.log(this.items);
  }

  mapCategories(categories: Category[]): any[] {
    if (categories !== undefined) {
      return categories.map((category) => {
        this.categoryService
          .getChildrenCategories(category.id)
          .subscribe((children) => {
            category.children = children;
          });
        return {
          label: category.name,
          items: this.mapCategories(category.children),
        };
      });
    } else {
      return [];
    }
  }

  //old
  // ngOnInit() {
  //   this.items = this.Categories.map((category) => {
  //     return {
  //       label: category.name,
  //       items: [],
  //       command: () => {
  //         this.viewChildren(category.id, this.items, this.Categories);
  //       },
  //     };
  //   });
  // }
  // viewChildren(parentId: number, selecteditems: any, selectedcategories: any) {
  //   this.categoryService
  //     .getChildrenCategories(parentId)
  //     .subscribe((children) => {
  //       const selectedCategory = selecteditems.find(
  //         (item: any) =>
  //           item.label ===
  //           selectedcategories.find((c: any) => c.id === parentId)?.name
  //       );
  //       if (selectedCategory) {
  //         selectedCategory.items = children.map((child) => {
  //           const childItem: any = {
  //             label: child.name,
  //             items: [],
  //             command: () => {
  //               this.viewChildren(child.id, selectedCategory.items, children);
  //             },
  //           };
  //           return childItem;
  //         });
  //         console.log(selectedCategory);
  //       }
  //     });
  // }
}
