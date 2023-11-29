import { Component, Input } from '@angular/core';
import { Category, Item } from '../shared/interfaces.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent {
  @Input() Items: Item[] = [];
}
