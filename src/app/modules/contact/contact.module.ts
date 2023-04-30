import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactMainComponent } from './contact-main/contact-main.component';
import { MatTableModule } from '@angular/material/table' 
import {MatSortModule} from '@angular/material/sort';


@NgModule({
  declarations: [ContactComponent, ContactMainComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    MatTableModule,
    MatSortModule
  ],
  exports:[
    MatTableModule,
    // MatInputModule,
    // MatSelectModule,
    // MatCardModule,
    MatSortModule
  ]
})
export class ContactModule { }
