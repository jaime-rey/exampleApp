import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'paTable',
  templateUrl: 'table.component.html',
})
export class TableComponent {
  category: string | null = null;
  constructor(public model: Model, activeRoute: ActivatedRoute) {
    activeRoute.params.subscribe((params) => {
      this.category = params['category'] || null;
    });
  }
  getProduct(key: number): Product | undefined {
    return this.model.getProduct(key);
  }
  getProducts(): Product[] {
    return this.model
      .getProducts();
  }
  deleteProduct(key?: number) {
    if (key != undefined) {
      this.model.deleteProduct(key);
    }
  }
 
}
