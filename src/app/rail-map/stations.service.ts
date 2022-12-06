import { Injectable } from '@angular/core';



import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from './station';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private httpClient: HttpClient) {
  }

  getStations(): Observable<Station[]> {
    return this.httpClient.get<Station[]>("https://localhost:44331/api/Stations/GetStations");
  }

  // getArticleById(id: number): Observable<Station> {
  //   return this.httpClient.get<Station>("http://localhost:3000/articles/" + id);
  // }

}
