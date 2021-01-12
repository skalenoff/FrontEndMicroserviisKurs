import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FormControlsModule } from './core/form-controls/form-controls.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './core/components/header/header.component';
import { RestService } from './services/rest.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgSelectModule } from '@ng-select/ng-select';
import { CheckboxModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FormControlsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    NgSelectModule,
    CheckboxModule, 
    WavesModule, 
    ButtonsModule
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }