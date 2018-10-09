import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiariaDetailComponent } from './diaria-detail/diaria-detail.component';
import { DiariasComponent } from './diarias/diarias.component';

const routes: Routes = [
  { path: '', redirectTo: 'diarias', pathMatch: 'full' },
  { path: 'diaria/:id', component: DiariaDetailComponent },
  { path: 'diarias', component: DiariasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
