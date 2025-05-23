import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: "",
  loadChildren: () => import('./login/login.module').then(m =>  m.LoginModule )
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],

  exports: [RouterModule]
})
export class AppRoutingModule { }
