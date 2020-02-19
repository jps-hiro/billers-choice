import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsComponent } from './patients/patients.component';
import { RouterModule } from '@angular/router';
import { HeaderInfoComponent } from './header-info/header-info.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [PatientsComponent, HeaderInfoComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: PatientsComponent},
      { path: 'header-info', component: HeaderInfoComponent},
    ])
  ]
})
export class AdminModule { }
