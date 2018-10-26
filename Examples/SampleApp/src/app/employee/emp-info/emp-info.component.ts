import { Component, OnChanges, SimpleChanges, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { IEmployee } from '../interfaces/IEmployee';

@Component({
  selector: 'app-emp-info',
  templateUrl: './emp-info.component.html',
  styleUrls: ['./emp-info.component.css']
})
export class EmpInfoComponent implements OnInit, OnDestroy, OnChanges {


  @Input() employees: IEmployee[];
  @Input() sampleText: string;
  @Output() sendDataToParent: EventEmitter<string> = new EventEmitter<string>();

  searchText:string;
  fBy:string;
  empId:number;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
   //console.log(changes.sampleText.previousValue);
  }
  ngOnInit() {
    //this.employees[0].Firstname;
    //this.sendDataToParent.emit("Child ok!");
  }
  ngOnDestroy() {
    console.log("Emp info Component Done!");
  }
  SendNewMessage() {
    this.sendDataToParent.emit("New Message!");
  }

}
