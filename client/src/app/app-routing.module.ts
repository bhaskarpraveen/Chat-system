import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ChatComponent } from './chat/chat.component';
const routes: Routes = [
  {path:'',component:FormComponent},
  {path:'chat/:username/:room',component:ChatComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  

exports: [RouterModule]
})
export class AppRoutingModule { }
