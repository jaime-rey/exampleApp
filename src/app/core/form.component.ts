import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
import { LimitValidator } from '../validation/limit';
import { ProhibitedValidator } from '../validation/prohibited';
import { UniqueValidator } from '../validation/unique';
import { FilteredFormArray } from './filteredFormArray';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'paForm',
  templateUrl: './form.component.html',
  styleUrls: ['form.component.css'],
})
export class FormComponent {
  product: Product = new Product();
  editing: boolean = false;
  keywordGroup = new FilteredFormArray([this.createKeywordFormControl()], {
    validators: UniqueValidator.unique(),
  });
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[A-Za-z ]+$'),
      ],
      updateOn: 'change',
    }),
    category: new FormControl('', {
      validators: Validators.required,
      asyncValidators: ProhibitedValidator.prohibited(),
    }),
    price: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern('^[0-9.]+$'),
        LimitValidator.Limit(300),
      ],
    }),
    details: new FormGroup({
      supplier: new FormControl('', { validators: Validators.required }),
      keywords: this.keywordGroup,
    }),
  });
  constructor(
    public model: Model,
    activeRoute: ActivatedRoute,
    public router: Router
  ) {
    activeRoute.params.subscribe((params) => {
      this.editing = params['mode'] == 'edit';
      let id = params['id'];
      if (id != null) {
        model.getProductObservable(id).subscribe((p) => {
          Object.assign(this.product, p || new Product());
          this.productForm.patchValue(this.product);
        });
      }
    });
  }
  submitForm() {
    if (this.productForm.valid) {
      Object.assign(this.product, this.productForm.value);
      this.model.saveProduct(this.product);
      this.router.navigateByUrl('/');
    }
  }
  unsavedChanges(): boolean {
    return this.productForm.dirty;
  }
  createKeywordFormControl(): FormControl {
    return new FormControl('', {
      validators: Validators.pattern('^[A-Za-z ]+$'),
    });
  }
  addKeywordControl() {
    this.keywordGroup.push(this.createKeywordFormControl());
  }
  removeKeywordControl(index: number) {
    this.keywordGroup.removeAt(index);
  }
}
