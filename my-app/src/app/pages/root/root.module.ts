import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root/root.component';
import { FormsModule} from '@angular/forms';
import { FormControlsModule } from 'src/app/core/form-controls/form-controls.module';
import { CheckboxModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FormControlsModule,
    RootRoutingModule,
    CheckboxModule, 
    WavesModule, 
    ButtonsModule
  ]
})
export class RootModule { }
