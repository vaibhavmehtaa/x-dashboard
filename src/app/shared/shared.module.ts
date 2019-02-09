import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {TableModule} from 'primeng/table';
import {SliderModule} from 'primeng/slider';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    SliderModule,
    DropdownModule,
    MultiSelectModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    SliderModule,
    DropdownModule,
    MultiSelectModule
  ]
})
export class SharedModule { }
