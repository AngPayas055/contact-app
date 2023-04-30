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

  //displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email','gender','jobtitle','department'];

  displayedColumnsWithObject: string[] = ['id', 'firstname', 'lastname', 'email','gender','jobtitle','department','project.name'];
  header: string[] = ['Id', 'First Name', 'Lastname', 'Email','gender','jobtitle','department','project.name']
  EmpData: Employee[] =[{"id":1,"firstname":"Mellie","lastname":"Gabbott","email":"mgabbott0@indiatimes.com","gender":"Female","department":"Support","jobtitle":"Support Analyst","project":{name:"project1",id:1}},
  {"id":2,"firstname":"Yehudi","lastname":"Ainsby","email":"yainsby1@w3.org","gender":"Female","department":"Support","jobtitle":"Support Analyst","project":{name:"project2",id:2}},
  {"id":3,"firstname":"Noellyn","lastname":"Primett","email":"nprimett2@ning.com","gender":"Female","department":"Human Resources","jobtitle":"Project Manager","project":{name:"project3",id:3}},
  {"id":4,"firstname":"Stefanie","lastname":"Yurenin","email":"syurenin3@boston.com","gender":"Female","department":"Marketing","jobtitle":"Senior officer","project":{name:"project4",id:4}},
  {"id":5,"firstname":"Stormi","lastname":"O'Lunny","email":"solunny4@patch.com","gender":"Female","department":"Engineering","jobtitle":"Software Engineer","project":{name:"project5",id:5}},
  {"id":6,"firstname":"Keelia","lastname":"Giraudy","email":"kgiraudy5@nba.com","gender":"Male","department":"Marketing","jobtitle":"Senior officer","project":{name:"project6",id:6}},
  {"id":7,"firstname":"Ikey","lastname":"Laight","email":"ilaight6@wiley.com","gender":"Male","department":"Support","jobtitle":"Support Analyst","project":{name:"project7",id:7}},
  {"id":8,"firstname":"Adrianna","lastname":"Ruddom","email":"aruddom7@seattletimes.com","gender":"Male","department":"Marketing","jobtitle":"Senior officer","project":{name:"project8",id:8}},
  {"id":9,"firstname":"Dionysus","lastname":"McCory","email":"dmccory8@ox.ac.uk","gender":"Male","department":"Engineering","jobtitle":"Software Engineer","project":{name:"project9",id:9}},
  {"id":10,"firstname":"Claybourne","lastname":"Shellard","email":"cshellard9@rediff.com","gender":"Male","department":"Engineering","jobtitle":"Software Engineer","project":{name:"project10",id:10}}];
  
  dataSource = new MatTableDataSource(this.EmpData);
  dataSourceWithObjectColumn = new MatTableDataSource(this.EmpData);
  
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('empTbSortWithObject') empTbSortWithObject = new MatSort();


  //contact variables

  contactDisplayedColumnsWithObject: string[] = ['fullName', 'mobileNumber', 'email', 'contactType','dateUpdated'];
  contactHeader: string[] = ['Full Name', 'Mobile No.','Email','Contact type','Date Updated'];
  contactData: Contact[] = [
    {fullName: 'testName', mobileNumber: 'testnumber',email: 'testemail',contactType: 'testContactType',dateUpdated: "testdateupdated"},
    {fullName: 'testName2', mobileNumber: 'testnumber2',email: 'testemail2',contactType: 'testContactType2',dateUpdated: "testdateupdated2"},
    {fullName: 'testName3', mobileNumber: 'testnumber3',email: 'testemail3',contactType: 'testContactType3',dateUpdated: "testdateupdated3"},
  ]

  constructor() { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {    
    this.sampleFunctions()
  }
  
  sampleFunctions(){
    //this.empTbSort.disableClear = true;
    this.dataSource.sort = this.empTbSort;

    this.empTbSortWithObject.disableClear = true;
    this.dataSourceWithObjectColumn.sort = this.empTbSortWithObject;
    this.dataSourceWithObjectColumn.sortingDataAccessor = (row:Employee,columnName:string) : string => {
      //console.log(row,columnName);
      if(columnName=="project.name") return row.project.name;
      var columnValue = row[columnName as keyof Employee] as string;
      return columnValue;
    }    
  }

}
