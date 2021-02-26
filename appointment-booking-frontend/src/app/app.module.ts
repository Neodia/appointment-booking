import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppointmentBookComponent } from './appointment-book/appointment-book.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatStepperModule } from '@angular/material/stepper'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CdkStepperModule } from '@angular/cdk/stepper';

import {MatButtonModule} from '@angular/material/button'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';




@NgModule({
  declarations: [
    AppComponent,
    AppointmentBookComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    CdkStepperModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    RouterModule.forRoot([
      { path: '', component: AppointmentBookComponent, pathMatch: 'full' },
    ]),
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
