import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css']
})
export class ContactDialogComponent implements OnInit {
    
  isEdit:boolean = false
  isDelete:boolean = false
  contactName: string = ""
  ctList: any = [
    {contactType: "Personal"},
    {contactType: "Service"},
    {contactType: "Emergency"}
  ];
  headerText: string = "Edit"
  submitText: string = "Update"
  editObj: any = {
    fullName: "",
    mobileNumber: "",
    email: "",
    contactType: "",
    dateUpdated: ""
  }
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  selectedContactType: string = "zzz";  
  selectedContactControl = new FormControl(this.selectedContactType);

  constructor(    
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
    ){ 
      if(data.action == 'edit'){
        this.isEdit = true
      }else if(data.action == 'delete'){
        this.isDelete = true
        this.contactName = data.data.fullName
      }else if( data.action == 'add'){
        this.isEdit = true
        this.headerText = "Add"
        this.submitText = "Add"
      }
      if(data.data){
        this.editObj = data.data
      }
  }
  cancelEdit(){
    this.dialogRef.close()
  }
  submitEdit(){
    if(this.editObj.email?.trim().length && !this.editObj.email.match(this.emailRegex)){
      alert("Invalid Email")
      return
    }
    this.dialogRef.close({
      clicked: 'submit',
      updatedData: this.editObj,
    });
  } 
  cancelDelete(){
    this.dialogRef.close()
  } 
  confirmDelete(){
    this.dialogRef.close({
      clicked: 'confirm',
      updatedData: this.editObj,
    });    
  } 
  ngOnInit(): void {
  }

}
