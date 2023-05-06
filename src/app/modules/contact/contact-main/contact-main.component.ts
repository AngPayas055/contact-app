import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort,Sort } from '@angular/material/sort';
import { Employee } from 'src/app/models/employee.model';
import { Contact } from 'src/app/models/contact.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactDialogComponent } from '../dialog/contact-dialog/contact-dialog.component'

@Component({
  selector: 'app-contact-main',
  templateUrl: './contact-main.component.html',
  styleUrls: ['./contact-main.component.css']
})
export class ContactMainComponent implements OnInit {

  //contact variables

  contactDisplayedColumnsWithObject: string[] = [ 'contactType','fullName', 'mobileNumber', 'email','dateUpdated'];
  contactHeader: string[] = ['Contact type','Full Name', 'Mobile No.','Email','Date Updated'];
  contactData: Contact[] = [
    {fullName: 'testName', mobileNumber: 'testnumber',email: 'testemail',contactType: 'testContactType',dateUpdated: "testdateupdated"},
    {fullName: 'testName2', mobileNumber: 'testnumber2',email: 'testemail2',contactType: 'testContactType2',dateUpdated: "testdateupdated2"},
    {fullName: 'testName3', mobileNumber: 'testnumber3',email: 'testemail3',contactType: 'testContactType3',dateUpdated: "testdateupdated3"},
  ]
  contactDataSource = new MatTableDataSource(this.contactData);
  contactDataSourceWithObjectColumn = new MatTableDataSource(this.contactData);
  
  @ViewChild('empTbSortContact') empTbSortContact = new MatSort();
  @ViewChild('empTbSortWithObjectContact') empTbSortWithObjectContact = new MatSort();
  
  dataFromDialog: any;

  constructor(private dialog: MatDialog) { }

  onEdit(edit:any){
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      // width: '350px',
      // height: '400px',
      data: {
        action: 'edit', 
        data: edit,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log('jzzzzz',data)
      // this.dataFromDialog = data.form;
      // if (data.clicked === 'submit') {
      //   console.log('Sumbit button clicked');
      // }
    });
  }

  onDelete(deletevar:any){
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
