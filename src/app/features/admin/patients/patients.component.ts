import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  items = []
  loading = false;
  pagination={
    previousPageIndex: 0,
    pageIndex: 0,
    pageSize: 25,
    length: 0
  };
  constructor(
    private patientsService: PatientsService
  ) { }

  ngOnInit(): void {
    this.refreshItems()
  }

  changePageEvent(event) {
    console.log(event)
    this.pagination = event;
    this.refreshItems();
  }

  refreshItems() {
    this.loading = true;
    this.patientsService.getPatients(this.pagination).subscribe(
      (res:any)=>{
        this.loading=false;
        console.log(res);
        this.items = res.payload.pageData;
        this.pagination.pageIndex=res.payload.pageIndex;
        this.pagination.pageSize = res.payload.pageSize;
        this.pagination.length = res.payload.itemsCount;

      },
      (err)=> {
        console.log(err);
        this.loading = false;
      }
    )
  }
  viewItem(item) {
    
  }

}
