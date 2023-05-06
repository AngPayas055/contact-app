import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort,Sort } from '@angular/material/sort';
import { Employee } from 'src/app/models/employee.model';
import { Contact } from 'src/app/models/contact.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactDialogComponent } from '../dialog/contact-dialog/contact-dialog.component'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contact-main',
  templateUrl: './contact-main.component.html',
  styleUrls: ['./contact-main.component.css'],
  providers: [DatePipe]
})
export class ContactMainComponent implements OnInit {

  //contact variables

  contactDisplayedColumnsWithObject: string[] = [ 'contactType','fullName', 'mobileNumber', 'email','dateUpdated'];
  contactHeader: string[] = ['Contact type','Full Name', 'Mobile No.','Email','Date Updated'];
  contactData: Contact[] = []
  contactDataSource = new MatTableDataSource(this.contactData);
  contactDataSourceWithObjectColumn = new MatTableDataSource(this.contactData);
  
  @ViewChild('empTbSortContact') empTbSortContact = new MatSort();
  @ViewChild('empTbSortWithObjectContact') empTbSortWithObjectContact = new MatSort();
  
  dataFromDialog: any;
  myDate = new Date();

  constructor(
    private dialog: MatDialog,
    private datePipe: DatePipe) { }

  onEdit(edit:any){
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      data: {
        action: 'edit', 
        data: edit,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if(data){
        let dataId = data.updatedData.id
        data.updatedData.dateUpdated = this.datePipe.transform(this.myDate, 'MMM d, y');
        this.contactData = this.contactData.map(contact => {
          if (contact.id === dataId) {
            return data.updatedData
          } else {
            return contact;
          }
        });
        localStorage.setItem('jContactList', JSON.stringify(this.contactData));
      }
    });
  }

  onDelete(deleteVar:any){
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      data: {
        action: 'delete', 
        data: deleteVar,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if(data){
        let idToRemove = data.updatedData.id
        const index = this.contactData.findIndex(item => item.id === idToRemove);
        if (index !== -1) {
          this.contactData.splice(index, 1);
          localStorage.setItem('jContactList', JSON.stringify(this.contactData));
          this.contactDataSource = new MatTableDataSource(this.contactData);
          this.contactDataSourceWithObjectColumn = new MatTableDataSource(this.contactData);
          return
        }
      }
    });
  }
  
  ngOnInit(): void {
    if(localStorage.getItem('jContactList') == null){
      let arr = [
        {id:1, fullName: 'testName', mobileNumber: 'testnumber',email: 'testemail@test.com',contactType: 'testContactType',dateUpdated: "testdateupdated"},
        {id:2, fullName: 'testName2', mobileNumber: 'testnumber2',email: 'testemail2@test.com',contactType: 'testContactType2',dateUpdated: "testdateupdated2"},
        {id:3, fullName: 'testName3', mobileNumber: 'testnumber3',email: 'testemail3@test.com',contactType: 'testContactType3',dateUpdated: "testdateupdated3"},
      ]
      localStorage.setItem('jContactList', JSON.stringify(arr));
    }
    let data = JSON.parse(localStorage.getItem("jContactList") || '{}');
    this.contactData = data
    
    this.contactDataSource = new MatTableDataSource(this.contactData);
    this.contactDataSourceWithObjectColumn = new MatTableDataSource(this.contactData);
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
