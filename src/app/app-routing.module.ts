import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { StationsComponent } from './rail-map/stations/stations.component';
import { NeighbourhoodComponent } from './rail-map/neighbourhood/neighbourhood.component';
import { FormTemplateComponent } from './form-template/form-template/form-template.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'railmap', component: StationsComponent },
  { path: 'neighbourhood', component: NeighbourhoodComponent },
  { path: 'form', component: FormTemplateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
