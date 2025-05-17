import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = environment.apiUrl;

  constructor(public http: HttpClient) {}

  getAllBranches(): Observable<any> {
    return this.http.get(this.apiUrl + 'getBranches', {
      observe: 'response',
    });
  }
}
