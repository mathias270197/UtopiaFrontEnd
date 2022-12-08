import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from './station';
import { Building } from './building';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private httpClient: HttpClient) {
  }

  getStations(): Observable<Station[]> {
    return this.httpClient.get<Station[]>("https://localhost:44331/api/Stations/GetStations");
  }

  GetEscapeRoomsOfStation(id: number): Observable<Building[]> {
    return this.httpClient.get<Building[]>("https://localhost:44331/api/Stations/GetEscapeRoomsOfStation/" + id);
  }

}
