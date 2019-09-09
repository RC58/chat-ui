import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home', loadChildren: './component/home/home.module#HomeModule'
  },
  {
    path: 'about', loadChildren: './component/about/about.module#AboutModule'
  },
  {
    path: 'content', loadChildren: './component/content/content.module#ContentModule'
  },
  {
    path: 'contact', loadChildren: './component/contact/contact.module#ContactModule'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
