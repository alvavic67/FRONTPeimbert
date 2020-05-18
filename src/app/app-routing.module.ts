import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagpieComponent } from './pages/pagpie/pagpie.component';
import { PagbarrasComponent } from './pages/pagbarras/pagbarras.component';


const routes: Routes = [
  { path: 'pagpie', component: PagpieComponent },
  { path: 'pagbarras', component: PagbarrasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
