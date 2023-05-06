import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css']
})
export class ContactDialogComponent implements OnInit {
    
  ctList: any = [
    {contactType: "Personal"},
    {contactType: "Service"},
    {contactType: "Emergency"}
  ];

  editObj: any = {
    fullName: "",
    mobileNumber: "",
    email: "",
    contactType: "",
    dateUpdated: ""
  }
  
  selectedContactType: string = "zzz";  
  selectedContactControl = new FormControl(this.selectedContactType);

  constructor(    
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
    ){ 
      this.editObj = data.data
  }
  cancelEdit(){
    this.dialogRef.close()
  }
  submitEdit(){
    this.dialogRef.close({
      clicked: 'submit',
      updatedData: this.editObj,
    });
  }  
  ngOnInit(): void {
  }

}
