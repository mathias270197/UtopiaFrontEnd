import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  


  constructor() { }

  public setCurrentUserName( currentUserName: string) {
    localStorage.setItem("currentUserName", currentUserName);
  }

  public setPersonalKeyIfNotExists() {
    if (localStorage.getItem("personalKey") === null) {
      //Create random string:
      let randomString = (Math.random()).toString(36).substring(7) +(Math.random()).toString(36).substring(7) + (Math.random()).toString(36).substring(7);
      localStorage.setItem("personalKey", randomString);
    }
  }

  public addUserWithZeroPointsIfUserNotExists( userName: string) {
    if (localStorage.getItem(userName) === null) {
      localStorage.setItem(userName, "0");
    }
  }

  public lookupPointsOfUser( userName: string) {
    var pointsAsString = localStorage.getItem(userName);
    if (pointsAsString === null) {
      pointsAsString = "0";
    }
    var pointsAsNumber = parseInt(pointsAsString)
    return pointsAsNumber
  }

  public lookupPointsOfCurrentUser() {
    var currentUserName = localStorage.getItem("currentUserName");
    if (currentUserName === null) {
      currentUserName = "";
    }
    return this.lookupPointsOfUser(currentUserName)
  }


  public static addPointsToUser( userName: string) {
    // to do
  }


}
