export interface Category {
  children: Category[];
  id: number;
  name: string;
  description: string;
  parentId: number;
}
export interface Item {
  id: number;
  name: string;
  description: string;
  categoryId: number;
}
