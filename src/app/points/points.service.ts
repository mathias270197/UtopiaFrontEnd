import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(private localStorageService: LocalStorageService) { }
  
  getPoints() {
    return  this.localStorageService.lookupPointsOfCurrentUser()
  }
}
