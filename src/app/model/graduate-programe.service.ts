import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Faculty } from './faculty';
import { GraduateProgram } from './graduate-program';

@Injectable({
  providedIn: 'root'
})
export class GraduateProgramService {

  private env = environment;

  constructor(private httpClient: HttpClient) {}

  getFacultiesAsynchronous(): Observable<Faculty[]> {
    var url = this.env.apiUrl + '/api/faculties/graduateprograms';
    console.log(url);
    return this.httpClient.get<Faculty[]>(url);
  }

  getFacultiesSynchronous(): Promise<any>{
    return this.getFaculties_helper().toPromise()
  }

  getFaculties_helper() {
    var url = this.env.apiUrl + '/api/faculties/graduateprograms';
    console.log(url);
    return this.httpClient.get(url);
  }

  

  getFacultyById(id: number): Observable<Faculty[]> {
    var url = this.env.apiUrl + '/api/faculties/' + id + '/graduateprograms';
    console.log(url);
    return this.httpClient.get<Faculty[]>(url);
  }

  getGraduateProgramById(id: number): Observable<GraduateProgram[]> {
    var url = this.env.apiUrl + '/api/graduateprograms/' + id + '/multiplechoiceanswers';
    console.log(url);
    return this.httpClient.get<GraduateProgram[]>(url);
  }

}
