import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalizacaoComponent } from './localizacao/localizacao.component';
import { SalaComponent } from './sala/sala.component';
import { CompanhiaComponent } from './companhia/companhia.component';
import { ReservaComponent } from './reserva/reserva.component';

const routes: Routes = [
  { path: 'localizacao', component: LocalizacaoComponent },
  { path: 'sala', component: SalaComponent },
  { path: 'companhia', component: CompanhiaComponent },
  { path: 'reserva', component: ReservaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }
