import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: any = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  getData(functionName: any) {
    return this.http.get(this.baseUrl + functionName, { withCredentials: true });
  }

  deleteData(functionName: any) {
    return this.http.delete(this.baseUrl + functionName, { withCredentials: true });
  }

  postData(functionName: any, data: any) {
    // Convert data to HttpParams (x-www-form-urlencoded format)
    const params = new HttpParams({ fromObject: data });

    // Set headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    // Make POST request with x-www-form-urlencoded data
    return this.http.post(this.baseUrl + functionName, params.toString(), { headers, withCredentials: true });
  }

  putData(functionName: any, data: any) {
    // Convert data to HttpParams (x-www-form-urlencoded format)
    const params = new HttpParams({ fromObject: data });

    // Set headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    // Make PUT request with x-www-form-urlencoded data
    return this.http.put(this.baseUrl + functionName, params.toString(), { headers, withCredentials: true });
  }
}
