import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormTemplateComponent } from './form-template/form-template/form-template.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'form', component: FormTemplateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
