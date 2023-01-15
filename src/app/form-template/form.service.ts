import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Answer } from './answer';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private httpClient: HttpClient) {}


  postAnswer(answer: Answer): Observable<Answer> {
    return this.httpClient.post<Answer>(environment.apiUrl + "/api/Answers", answer);
  }
}
