import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/local-storage/local-storage.service';
import { Faculty } from 'src/app/model/faculty';
import { GraduateProgram } from 'src/app/model/graduate-program';
import { GraduateProgramService } from 'src/app/model/graduate-programe.service';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  userName: string = '';
  errorMessage: string = '';
  graduatePrograms: GraduateProgram[] = [];
  faculties: Faculty[] = [];

  constructor(private router: Router, private loginService: LoginService, 
    private graduateProgramService: GraduateProgramService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getLocalStorageItems();
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
    //validatie toevoegen voor login name: mag niet "currentUserName", "" of "personalKey" zijn!!!
    this.loginService.login(this.userName)
    this.router.navigateByUrl("/stations")
  }

  async getLocalStorageItems() {
    this.graduatePrograms = await this.graduateProgramService.getGraduateProgramsSync();
    let numberOfStations = this.graduatePrograms.length
    let randomStation = Math.floor(Math.random() * numberOfStations);
    this.localStorageService.setActiveStationId(this.graduatePrograms[randomStation].id);

    this.localStorageService.setGraduatePrograms(this.graduatePrograms);
    this.localStorageService.setCompletedStations([]);
    this.localStorageService.setCurrentLine(1);

    this.faculties = await this.graduateProgramService.getFacultiesSync();
    this.localStorageService.setFaculties(this.faculties);

  }

}
