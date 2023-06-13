import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { TableComponent } from './table.component';
import { FormComponent } from './form.component';
import { ValidationErrorsDirective } from './validationErrors.directive';
import { HiLowValidatorDirective } from '../validation/hilow';
import { ValidationHelper } from './validation_ helper';

import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ModelModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    TableComponent,
    FormComponent,
    ValidationHelper,
    ValidationErrorsDirective,
    HiLowValidatorDirective,
  ],
  exports: [ModelModule, TableComponent, FormComponent],
})
export class CoreModule {}
