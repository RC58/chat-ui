import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content.component';

const routes: Routes = [
    { path: '', component: ContentComponent }
];

@NgModule({
  declarations: [ContentComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentModule { }