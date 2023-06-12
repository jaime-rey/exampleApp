import { Details } from './details.model';

export class Product {
  constructor(
    public id?: number,
    public name?: string,
    public category?: string,
    public price?: number,
    public details?: Details
  ) {}
}
