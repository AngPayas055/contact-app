import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  testArr = ['blue','red','yellow','green']

  constructor() { }

  ngOnInit(): void {
  }

}
