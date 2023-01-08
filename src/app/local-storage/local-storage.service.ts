import { Injectable } from '@angular/core';
import { Person } from '../login/person';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  person: Person = {
    PersonalKey : "",
    UserName : "",
  };

  currentUserName: string | null = null;
  personalKey: string | null = null;

  lines: any[]=[];

  constructor() { }

  public getCurrentUser() {
    this.currentUserName = localStorage.getItem("currentUserName")
    this.personalKey = localStorage.getItem("personalKey")
    if (this.currentUserName !== null && this.personalKey !== null) {
    this.person.UserName = this.currentUserName;
    this.person.PersonalKey = this.personalKey
    }
    return this.person
  }

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

  public setLines(lines: any) {
    lines =  JSON.stringify(lines);
    localStorage.setItem("lines", lines);
  }

  public getLines() {
    var lines = JSON.parse(localStorage.getItem("lines")|| '{}');
    return lines
  }

  public setMetromap(metromap: string) {
    localStorage.setItem("metromap", metromap);
  }

  public getMetromap() {
    var metromap = localStorage.getItem("metromap");
    return metromap
  }

  public setCurrentFormId(id: number) {
    localStorage.setItem("currentFormId", id.toString());
  }

  public getCurrentFormId() {
    var currentFormId = localStorage.getItem("currentFormId");
    return currentFormId
  }

}
