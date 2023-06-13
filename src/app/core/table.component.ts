import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
@Component({
  selector: 'paTable',
  templateUrl: 'table.component.html',
})
export class TableComponent {
  constructor(private model: Model) {}
  getProduct(key: number): Product | undefined {
    return this.model.getProduct(key);
  }
  getProducts(): Product[] {
    return this.model.getProducts();
  }
  deleteProduct(key?: number) {
    if (key != undefined) {
      this.model.deleteProduct(key);
    }
  }
}
