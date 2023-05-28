import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort,Sort } from '@angular/material/sort';
import { Employee } from 'src/app/models/employee.model';
import { Contact } from 'src/app/models/contact.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactDialogComponent } from '../dialog/contact-dialog/contact-dialog.component'
import { DatePipe } from '@angular/common';
import Chart from 'chart.js/auto';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import {ThemePalette} from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: 'app-contact-main',
  templateUrl: './contact-main.component.html',
  styleUrls: ['./contact-main.component.css'],
  providers: [DatePipe]
})

export class ContactMainComponent implements OnInit {

  //contact variables
  
  public chart: any;
  contactDisplayedColumnsWithObject: string[] = [ 'contactType','fullName', 'mobileNumber', 'email','dateUpdated'];
  contactHeader: string[] = ['Contact type','Full Name', 'Mobile No.','Email','Date Updated'];
  contactData: Contact[] = []
  contactDataSource = new MatTableDataSource(this.contactData);
  contactDataSourceWithObjectColumn = new MatTableDataSource(this.contactData);
  colors:any = ['#003f5c','#bc5090','#ffa600']
  jData:any = []
  checkedAdd:boolean = true
  checkedEdit:boolean = true
  checkedDelete:boolean = true
  checkedExport:boolean = true

  @ViewChild('empTbSortContact') empTbSortContact = new MatSort();
  @ViewChild('empTbSortWithObjectContact') empTbSortWithObjectContact = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataFromDialog: any;
  myDate = new Date();   
  allComplete: boolean = false;

  constructor(
    private dialog: MatDialog,
    private datePipe: DatePipe) { }
    task: Task = {
      name: 'Indeterminate',
      completed: false,
      color: 'warn',
      subtasks: [
        {name: 'Personal', completed: false, color: 'primary'},
        {name: 'Service', completed: false, color: 'primary'},
        {name: 'Emergency', completed: false, color: 'primary'},
      ],
    };
    
    deleteSelected(){
      if(this.task.subtasks && this.task.subtasks[0].completed == true){
        console.log('true')

        this.contactData = this.contactData.filter(contact => contact.contactType !== "Personal")
      }if(this.task.subtasks && this.task.subtasks[1].completed == true){
        console.log('true')

        this.contactData = this.contactData.filter(contact => contact.contactType !== "Service")
      }if(this.task.subtasks && this.task.subtasks[2].completed == true){
        console.log('true')

        this.contactData = this.contactData.filter(contact => contact.contactType !== "Emergency")
      }
      localStorage.setItem('jContactList', JSON.stringify(this.contactData));
      this.contactDataSource.sort = this.empTbSortContact;
      this.contactDataSource = new MatTableDataSource(this.contactData);
      this.contactDataSourceWithObjectColumn = new MatTableDataSource(this.contactData);
      this.empTbSortWithObjectContact.disableClear = true;
      this.contactDataSourceWithObjectColumn.sort = this.empTbSortWithObjectContact;
      this.chartDataUpdate()
      // this.ngOnInit()
    this.contactDataSource.paginator = this.paginator;
      console.log(this.contactData)
    }
    updateAllComplete() {
      this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    }
  
    someComplete(): boolean {
      if (this.task.subtasks == null) {
        return false;
      }
      return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
    }
  
    setAll(completed: boolean) {
      this.allComplete = completed;
      if (this.task.subtasks == null) {
        return;
      }
      this.task.subtasks.forEach(t => (t.completed = completed));
    }

  toggleAddButton(checked: boolean) {
    this.checkedAdd = checked;
  }
  toggleEditButton(checked: boolean) {
    this.checkedEdit = checked;
  }
  toggleDeleteButton(checked: boolean) {
    this.checkedDelete = checked;
  }
  toggleExportButton(checked: boolean) {
    this.checkedExport = checked;
  }
  paginatorPageEvent(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.contactDataSourceWithObjectColumn.data = this.contactData.slice(startIndex, endIndex);
  }
  exportToPdf(): void {
    const doc = new jsPDF();

    (doc as any).autoTable({
      head: [['Full Name', 'Mobile Number', 'Email', 'Contact Type', 'Date Updated']],
      body: this.contactData.map(obj => [
        obj.fullName,
        obj.mobileNumber,
        obj.email,
        obj.contactType,
        obj.dateUpdated
      ])
    });
    doc.save('exported-data.pdf');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.contactDataSourceWithObjectColumn.filter = filterValue.trim().toLowerCase();
    console.log(this.contactData)
  }
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
        this.contactDataSource.sort = this.empTbSortContact;
        this.empTbSortWithObjectContact.disableClear = true;
        this.contactDataSourceWithObjectColumn.sort = this.empTbSortWithObjectContact;
        this.chartDataUpdate()
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
          this.contactDataSource.sort = this.empTbSortContact;
          this.contactDataSource = new MatTableDataSource(this.contactData);
          this.contactDataSourceWithObjectColumn = new MatTableDataSource(this.contactData);
          this.empTbSortWithObjectContact.disableClear = true;
          this.contactDataSourceWithObjectColumn.sort = this.empTbSortWithObjectContact;
          this.chartDataUpdate()
        }
      }
    });
  }
  onAdd(){
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      data: {
        action: 'add',
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if(data){
        // let lastObjId = this.contactData[]
        data.updatedData.id = this.contactData[this.contactData.length - 1].id + 1
        data.updatedData.dateUpdated = this.datePipe.transform(this.myDate, 'MMM d, y');
        this.contactData.push(data.updatedData)
        localStorage.setItem('jContactList', JSON.stringify(this.contactData));
        this.contactDataSource.sort = this.empTbSortContact;
        this.empTbSortWithObjectContact.disableClear = true;
        this.contactDataSourceWithObjectColumn.sort = this.empTbSortWithObjectContact;
        this.chartDataUpdate()
        // let dataId = data.updatedData.id
        // data.updatedData.dateUpdated = this.datePipe.transform(this.myDate, 'MMM d, y');
        // this.contactData = this.contactData.map(contact => {
        //   if (contact.id === dataId) {
        //     return data.updatedData
        //   } else {
        //     return contact;
        //   }
        // });
        // localStorage.setItem('jContactList', JSON.stringify(this.contactData));
      }
    });
  }
  ngOnInit(): void {
    if(localStorage.getItem('jContactList') == null){
      let arr = [
        {id:1, fullName: 'Levi Ackerman', mobileNumber: '+639123654223',email: 'levi@jmendiola.com',contactType: 'Personal',dateUpdated: "May 27, 2023"},
        {id:2, fullName: 'London Police', mobileNumber: '+639888221312',email: 'lp.gov@mail.com',contactType: 'Emergency',dateUpdated: "April 6, 2023"},
        {id:3, fullName: 'Manchester Vulcanizing', mobileNumber: '+639912328076',email: 'mctr.vulcanizing@gmail.com',contactType: 'Service',dateUpdated: "May 1, 2023"},
        {id:4, fullName: 'Dagenham Pungko-pungko', mobileNumber: '+639022222812',email: 'dagenham.pungko@gmail.com',contactType: 'Service',dateUpdated: "May 8, 2023"},
        {id:5, fullName: 'Hampton Pares', mobileNumber: '+639127340879',email: 'hampton.Pares@gmail.com',contactType: 'Service',dateUpdated: "May 1, 2023"},
        {id:6, fullName: 'Emergency', mobileNumber: '911',email: 'lp.gov@mail.com',contactType: 'Emergency',dateUpdated: "April 6, 2023"},
        {id:7, fullName: 'Manong Edgar', mobileNumber: '+639012904447',email: 'levi@jmendiola.com',contactType: 'Personal',dateUpdated: "May 27, 2023"},
      ]
      localStorage.setItem('jContactList', JSON.stringify(arr));
    }
    let data = JSON.parse(localStorage.getItem("jContactList") || '{}');
    this.contactData = data
    
    this.contactDataSource = new MatTableDataSource(this.contactData);
    this.contactDataSourceWithObjectColumn = new MatTableDataSource(this.contactData);
    console.log(this.contactData)
    this.chartDataUpdate()
  }
  
  ngAfterViewInit() {    
    this.contactInstance()
    this.contactDataSource.paginator = this.paginator;
    // this.paginator.pageIndex = 0;
    // this.paginator.pageSize = 5; // Adjust the page size as needed
    // this.paginatorPageEvent(this.paginator);
  }
  contactInstance(){
    //this.empTbSortContact.disableClear = true;
    this.contactDataSource.sort = this.empTbSortContact;
    this.empTbSortWithObjectContact.disableClear = true;
    this.contactDataSourceWithObjectColumn.sort = this.empTbSortWithObjectContact;
  }
  

  chartDataUpdate(){
    let dataList = []    
    dataList.push(this.contactData.filter(item => item.contactType === 'Personal').length)
    dataList.push(this.contactData.filter(item => item.contactType === 'Service').length)
    dataList.push(this.contactData.filter(item => item.contactType === 'Emergency').length)
    console.log('dlist',this.chart)
    this.jData = dataList
    this.createChart()
  }
  
  createChart(){
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart("MyChart", {
      type: 'doughnut', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: ['Personal', 'Service','Emergency'],
	      datasets: [{
        // label: 'My First Dataset',
        data: this.jData,//[300, 240, 100],
        backgroundColor: ['#003f5c','#bc5090','#ffa600',
          'yellow',
          'orange',
          'blue',			
        ],
        hoverOffset: 4
        }],
      },
      options: {
        aspectRatio:2.5,
        plugins: {
          legend: {
            position: 'left'
          }
        }
      }

    });
  }

}
