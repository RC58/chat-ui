import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { Routes, RouterModule } from '@angular/router';

// const routes: Routes = [
//   {
//     path: '', redirectTo: '/home', pathMatch: 'full'
//   },
//   {
//     path: 'home', component: HomeComponent
//   },
//   {
//     path: 'about', component: AboutComponent
//   },
//   {
//     path: 'content', component: ContentComponent
//   },
//   {
//     path: 'contact', component: ContactComponent
//   }
// ];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
