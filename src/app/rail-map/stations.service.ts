import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from './station';
import { Building } from './building';
import { environment } from '../../environments/environment';
import { Person } from '../login/person';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  person: Person = {
    PersonalKey : "",
    UserName : "",
  }

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService ) {
  }

  getStations(): Observable<Station[]> {
    return this.httpClient.get<Station[]>(environment.apiUrl + "/api/Stations/GetStations");
  }

  GetEscapeRoomsOfStation(id: number): Observable<Building[]> {
    this.person = this.localStorageService.getCurrentUser();
    return this.httpClient.get<Building[]>(environment.apiUrl + "/api/Stations/GetEscapeRoomsOfStation/" + id + "/" + this.person.UserName +"/" +this.person.PersonalKey);
    
  }

}
