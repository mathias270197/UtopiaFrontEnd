import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { StationsComponent } from './rail-map/stations/stations.component';
import { NeighbourhoodComponent } from './rail-map/neighbourhood/neighbourhood.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'RailMap', component: StationsComponent },
  { path: 'neighbourhood/:id', component: NeighbourhoodComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
