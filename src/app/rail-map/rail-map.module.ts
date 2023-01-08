import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationsComponent } from './stations/stations.component';
import { StationComponent } from './station/station.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NeighbourhoodComponent } from './neighbourhood/neighbourhood.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';





@NgModule({
  declarations: [
    StationsComponent,
    StationComponent,
    NeighbourhoodComponent,
  
   
  ],
  imports: [
    CommonModule,
    NgbModule,
   
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class RailMapModule { }
