import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';

const routes: Routes = [
    { path: '', component: AboutComponent }
];

@NgModule({
  declarations: [AboutComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutModule { }