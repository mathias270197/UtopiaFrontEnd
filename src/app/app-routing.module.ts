import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { StationsComponent } from './rail-map/stations/stations.component';

import { FormTemplateComponent } from './form-template/form-template/form-template.component';
import { MetrolineComponent } from './metroline/metroline/metroline.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'stations', component: StationsComponent },

  { path: 'form', component: FormTemplateComponent},
  { path: 'line', component: MetrolineComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
