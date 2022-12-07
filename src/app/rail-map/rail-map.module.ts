import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationsComponent } from './stations/stations.component';
import { StationComponent } from './station/station.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NeighbourhoodComponent } from './neighbourhood/neighbourhood.component';
import { BuildingComponent } from './building/building.component';



@NgModule({
  declarations: [
    StationsComponent,
    StationComponent,
    NeighbourhoodComponent,
    BuildingComponent,
  ],
  imports: [
    CommonModule
  ],
})
export class RailMapModule { }
