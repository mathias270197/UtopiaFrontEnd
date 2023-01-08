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

  // Get the faculties with graduate programs ASYNC
  getFacultiesAsync(): Observable<Faculty[]> {
    var url = this.env.apiUrl + '/api/faculties/graduateprograms';
    console.log(url);
    return this.httpClient.get<Faculty[]>(url);
  }

  // Get the faculties with graduate programs SYNC
  getFacultiesSync(): Promise<any>{
    return this.getFacultiesSync_helper().toPromise()
  }
  getFacultiesSync_helper() {
    var url = this.env.apiUrl + '/api/faculties/graduateprograms';
    console.log(url);
    return this.httpClient.get(url);
  }

  
  // Get one faculty with graduate programs ASYNC
  getFacultyById(id: number): Observable<Faculty[]> {
    var url = this.env.apiUrl + '/api/faculties/' + id + '/graduateprograms';
    console.log(url);
    return this.httpClient.get<Faculty[]>(url);
  }

  // Get one graduate program with questions and multiplechoice ansers ASYNC
  getGraduateProgramById(id: number): Observable<GraduateProgram[]> {
    var url = this.env.apiUrl + '/api/graduateprograms/' + id + '/multiplechoiceanswers';
    console.log(url);
    return this.httpClient.get<GraduateProgram[]>(url);
  }


    // Get the faculties with graduate programs SYNC
    getGraduateProgramsSync(): Promise<any>{
      return this.getFacultiesSync_helper().toPromise()
    }
    getGraduateProgramsSync_helper() {
      var url = this.env.apiUrl + '/api/graduateprograms';
      console.log(url);
      return this.httpClient.get(url);
    }
  

}
