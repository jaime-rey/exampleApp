import { Component } from '@angular/core';
import { FormControl, NgForm, Validators, FormGroup } from '@angular/forms';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
import { Message } from '../messages/message.model';
import { MessageService } from '../messages/message.service';
import { MODES, SharedState, StateUpdate } from './sharedState.service';
@Component({
  selector: 'paForm',
  templateUrl: './form.component.html',
  styleUrls: ['form.component.css'],
})
export class FormComponent {
  product: Product = new Product();
  editing: boolean = false;
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[A-Za-z ]+$'),
      ],
      updateOn: 'change',
    }),
    category: new FormControl('', { validators: Validators.required }),
    price: new FormControl('', {
      validators: [Validators.required, Validators.pattern('^[0-9.]+$')],
    }),
  });

  constructor(
    private model: Model,
    private state: SharedState,
    private messageService: MessageService
  ) {
    this.state.changes.subscribe((upd) => this.handleStateChange(upd));
    this.messageService.reportMessage(new Message('Creating New Product'));
  }

  handleStateChange(newState: StateUpdate) {
    this.editing = newState.mode == MODES.EDIT;
    if (this.editing && newState.id) {
      Object.assign(
        this.product,
        this.model.getProduct(newState.id) ?? new Product()
      );
      this.messageService.reportMessage(
        new Message(`Editing ${this.product.name}`)
      );
      // this.nameField.setValue(this.product.name);

      // this.categoryField.setValue(this.product.category);
    } else {
      this.product = new Product();
      this.messageService.reportMessage(new Message('Creating New Product'));
      // this.nameField.setValue('');
      // this.categoryField.setValue('');
    }
    this.productForm.reset(this.product);
  }

  submitForm() {
    if (this.productForm.valid) {
      Object.assign(this.product, this.productForm.value);
      this.model.saveProduct(this.product);
      this.product = new Product();
      this.productForm.reset();
    }
  }
  resetForm() {
    this.editing = true;
    this.product = new Product();
    this.productForm.reset();
  }
}
