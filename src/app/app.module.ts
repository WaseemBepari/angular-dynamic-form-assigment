import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SchemaService } from './services/schema.service';
import { ValidationHelperService } from './services/validation-helper.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule,ReactiveFormsModule ],
  declarations: [ AppComponent],
  bootstrap:    [ AppComponent ],
  providers: [SchemaService, ValidationHelperService]
})
export class AppModule { }
