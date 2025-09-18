import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LocalizacaoDetalheComponent } from './localizacao-detalhe/localizacao-detalhe.component';
import { SalaDetalheComponent } from './sala-detalhe/sala-detalhe.component';

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
},
{
  path: 'localizacao-detalhe', component: LocalizacaoDetalheComponent
},
{
  path: 'sala-detalhe', component: SalaDetalheComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],

  exports: [RouterModule]
})
export class AppRoutingModule { }
