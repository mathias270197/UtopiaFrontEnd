import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetrolineComponent } from './metroline/metroline.component';
import { MetrolineService } from './metroline.service';




@NgModule({
  declarations: [
  MetrolineComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MetrolineComponent,
  ],
  providers:[
    MetrolineService
  ],
})
export class MetrolineModule { }
