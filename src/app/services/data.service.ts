import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: any = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getData(functionName: any) {
    return this.http.get(this.baseUrl + functionName)
  }

  postData(functionName: any, data: any) {
    return this.http.post(this.baseUrl + functionName, data)
  }
  updateData(functionName: any, data: any) {
    return this.http.put(this.baseUrl + functionName, data)
  }
}
