import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from './station';
import { Building } from './building';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private httpClient: HttpClient) {
  }

  getStations(): Observable<Station[]> {
    return this.httpClient.get<Station[]>(environment.apiUrl + "/api/Stations/GetStations");
  }

  GetEscapeRoomsOfStation(id: number): Observable<Building[]> {
    return this.httpClient.get<Building[]>(environment.apiUrl + "/api/Stations/GetEscapeRoomsOfStation/" + id);
  }

}
