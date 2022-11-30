import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private localStorageService: LocalStorageService) { }

  login(userName: string) {
    //als userName leeg is: zelf userName toekennen

    this.localStorageService.setPersonalKeyIfNotExists();
    this.localStorageService.setCurrentUserName(userName);
    this.localStorageService.addUserWithZeroPointsIfUserNotExists(userName);
  }

  
}
