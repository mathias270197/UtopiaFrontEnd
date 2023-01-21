import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTemplateComponent } from './form-template/form-template.component';
import { PointsModule } from '../points/points.module';
import { PointsComponent } from '../points/points/points.component';



@NgModule({
  declarations: [
    FormTemplateComponent,
  ],
  imports: [
    CommonModule,
    PointsModule
  ]
})
export class FormTemplateModule { }
