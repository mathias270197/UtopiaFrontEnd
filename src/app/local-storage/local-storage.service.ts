import { Injectable} from '@angular/core';
import { Person } from '../login/person';
import { Faculty } from '../model/faculty';
import { GraduateProgram } from '../model/graduate-program';


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
  lines: any[] = [];
  completedStations: any[] = [];

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

  public addUserWithZeroPointsIfUserNotExists(userName: string) {
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
    lines=JSON.stringify(lines);
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

  // public setCurrentFormId(id: number) {
  //   localStorage.setItem("currentFormId", id.toString());
  // }

  // public getCurrentFormId() {
  //   var currentFormId = localStorage.getItem("currentFormId");
  //   return currentFormId
  // }

  public setNeighborhoodIds(ids: number[]) {
    localStorage.setItem("neighborhoodIds", ids.toString());
  }

  public getNeighborhoodIds() {
    var neighborhoodIds = localStorage.getItem("neighborhoodIds");
    return neighborhoodIds
  }

  public setActiveStationId(id: number) {
    localStorage.setItem("activeStationId", id.toString());
  }

  public getActiveStationId() {
    var activeStation = localStorage.getItem("activeStationId");
    return activeStation
  }

  public setDestinationStationId(id: number) {
    localStorage.setItem("destinationStation", id.toString());
  }

  public getDestinationStationId() {
    var destinationStation = localStorage.getItem("destinationStation");
    return destinationStation
  }

  public setGraduatePrograms(graduatePrograms: GraduateProgram[]) {
    let graduatePrograms_temp = JSON.stringify(graduatePrograms);
    localStorage.setItem("graduatePrograms", graduatePrograms_temp);
  }

  public getGraduatePrograms() {
    var activeStation = localStorage.getItem("graduatePrograms");
    return activeStation
  }

  public setFaculties(faculties: Faculty[]) {
    let faculties_temp = JSON.stringify(faculties);
    localStorage.setItem("faculties", faculties_temp);
  }

  public getFaculties() {
    var faculties = JSON.parse(localStorage.getItem("faculties") || '{}');
    return faculties
  }

  public setCurrentLine(id: number){
    localStorage.setItem("currentLine", id.toString());
  }
  public getCurrentLine() {
    var currentLine = parseInt(localStorage.getItem("currentLine")||'');
    return currentLine
  }

  public setDestinationStation(id: number){
    localStorage.setItem("destinationStation", id.toString());
  }

  public getDestinationStation() {
    var destinationStation = parseInt(localStorage.getItem("destinationStation")||'');
    return destinationStation
  }

  public setCompletedStations(ids: object[]){
    localStorage.setItem("completedStations", JSON.stringify(ids));
  }

  public getCompletedStations() {
    var completedStations = JSON.parse(localStorage.getItem("completedStations") || '{}');
    return completedStations
  }

  public getStationWithGraduateProgramId(graduateProgramId: number) {
    // console.log('Dit is het station dat ik zoek: ' + graduateProgramId)
    let lines = this.getLines()
    let returnStation: any;
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      // console.log('Current line: ' + JSON.stringify(line))
      for (let j = 0; j < line.stations.length; j++) {
        let station = line.stations[j];
        // console.log('Current station: ' + JSON.stringify(station))
        // console.log('GraduateProgramID: ' + station.graduateProgramId)
        // console.log(typeof station.graduateProgramId)
        let currentStationGraduateProgramId = Number(JSON.stringify(station.graduateProgramId))
        if (currentStationGraduateProgramId == graduateProgramId) {
          returnStation = station.connection;
        }
      }
    }
    console.log('This is the return station: ' + returnStation);
    return returnStation
  }

  public getGraduateProgramIdwithLineIdAndStationId(lineId: number, stationId: number) {
    let lines = this.getLines()

    return lines[lineId].stations[stationId].graduateProgramId
  }


}
