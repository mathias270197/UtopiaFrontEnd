import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login/login.component';
import { FormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import { FormTemplateComponent } from './form-template/form-template.component';
import { HttpClientModule } from '@angular/common/http';
import { RailMapModule } from './rail-map/rail-map.module';
import { PointsModule } from './points/points.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MetrolineModule } from './metroline/metroline.module';





@NgModule({
  declarations: [
    AppComponent,
    FormTemplateComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RailMapModule,
    HttpClientModule,
    PointsModule,
    NgbModule,
    MetrolineModule,
  ],
  exports: [
    PointsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
