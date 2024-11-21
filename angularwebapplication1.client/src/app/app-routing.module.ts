import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //ng generate component home
  //path:'home',
  //component: HomeComponent
  //<a [routerlink]= "['/home']"> Home</a> //app.component.html
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
