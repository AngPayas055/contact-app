import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort,Sort } from '@angular/material/sort';
import { Employee } from 'src/app/models/employee.model';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-main',
  templateUrl: './contact-main.component.html',
  styleUrls: ['./contact-main.component.css']
})
export class ContactMainComponent implements OnInit {

  //contact variables

  contactDisplayedColumnsWithObject: string[] = ['fullName', 'mobileNumber', 'email', 'contactType','dateUpdated'];
  contactHeader: string[] = ['Full Name', 'Mobile No.','Email','Contact type','Date Updated'];
  contactData: Contact[] = [
    {fullName: 'testName', mobileNumber: 'testnumber',email: 'testemail',contactType: 'testContactType',dateUpdated: "testdateupdated"},
    {fullName: 'testName2', mobileNumber: 'testnumber2',email: 'testemail2',contactType: 'testContactType2',dateUpdated: "testdateupdated2"},
    {fullName: 'testName3', mobileNumber: 'testnumber3',email: 'testemail3',contactType: 'testContactType3',dateUpdated: "testdateupdated3"},
  ]
  contactDataSource = new MatTableDataSource(this.contactData);
  contactDataSourceWithObjectColumn = new MatTableDataSource(this.contactData);
  
  @ViewChild('empTbSortContact') empTbSortContact = new MatSort();
  @ViewChild('empTbSortWithObjectContact') empTbSortWithObjectContact = new MatSort();

  constructor() { }

  onEdit(edit:any){
    console.log(edit)
  }
  onDelete(deletevar:any){
    console.log(deletevar)
  }
  
  ngOnInit(): void {
  }
  
  ngAfterViewInit() {    
    this.contactInstance()
  }
  contactInstance(){
    //this.empTbSort.disableClear = true;
    this.contactDataSource.sort = this.empTbSortContact;

    this.empTbSortWithObjectContact.disableClear = true;
    this.contactDataSourceWithObjectColumn.sort = this.empTbSortWithObjectContact;
  }

}
