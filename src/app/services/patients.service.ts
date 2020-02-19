import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(
    private http: HttpClient
  ) { }

  getPatients(pagination) {
    return this.http.get(`api/Patients?maximumRows=${pagination.pageSize}&startRowIndex=${pagination.pageIndex}`);
  }
}
