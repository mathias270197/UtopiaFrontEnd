import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationsComponent } from './stations/stations.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MetrolineComponent } from '../metroline/metroline/metroline.component';
import { PointsComponent } from '../points/points/points.component';
import { PointsModule } from '../points/points.module';





@NgModule({
  declarations: [
    StationsComponent,
    MetrolineComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    PointsModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class RailMapModule { }
