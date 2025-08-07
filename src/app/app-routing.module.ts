import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
{
  path: '', redirectTo: '/login', pathMatch: 'full'
},
{
  path: 'cadastro',
  loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroModule)
},
{
  path: 'home', component: HomeComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],

  exports: [RouterModule]
})
export class AppRoutingModule { }
