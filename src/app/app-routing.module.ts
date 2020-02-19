import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from './shared/layout/layout.module';
import { MainComponent } from './shared/layout/main/main.component';
import { AuthGuard } from './services/auth.guard';



const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { 
        path: '', 
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule) 
      },
      { 
        path: 'auth', 
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)},
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [LayoutModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
