import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact.component';
import { ActivityComponent } from './activity/activity.component'

const routes: Routes = [
    { path: '', component: ContactComponent },
    { path: 'activity', component: ActivityComponent },
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
