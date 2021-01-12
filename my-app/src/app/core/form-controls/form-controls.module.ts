import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputFieldComponent} from './input-field/input-field.component';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';

@NgModule({
  declarations: [InputFieldComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule
  ],
  exports: [
    InputFieldComponent
  ]
})
export class FormControlsModule {
}
