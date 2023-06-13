import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { TableComponent } from './table.component';
import { FormComponent } from './form.component';
import { ValidationErrorsDirective } from './validationErrors.directive';
import { HiLowValidatorDirective } from '../validation/hilow';
import { RouterModule } from '@angular/router';
import { ProductCountComponent } from './productCount.component';
import { CategoryCountComponent } from './categoryCount.component';
import { NotFoundComponent } from './notFound.component';
import { ValidationHelper } from './validation_ helper';
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
    ProductCountComponent,
    CategoryCountComponent,
    NotFoundComponent,
  ],
  exports: [ModelModule, TableComponent, FormComponent],
})
export class CoreModule {}
