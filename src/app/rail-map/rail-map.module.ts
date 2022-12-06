import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationsComponent } from './stations/stations.component';
import { StationComponent } from './station/station.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [
    StationsComponent,
    StationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StationComponent
  ],
})
export class RailMapModule { }
