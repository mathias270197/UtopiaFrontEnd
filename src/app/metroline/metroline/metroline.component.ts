import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getMaxListeners } from 'process';
import { LocalStorageService } from 'src/app/local-storage/local-storage.service';
import { GraduateProgramService } from 'src/app/model/graduate-programe.service';
import { MetrolineService } from '../metroline.service';


@Component({
  selector: 'app-metroline',
  templateUrl: './metroline.component.html',
  styleUrls: ['./metroline.component.scss']
})
export class MetrolineComponent implements OnInit {
  lines: any = null;
  activeline: any = [];
  stations: any = [];
  graduatePrograms: any = [];
  gp: any;
  al = 2;
  faculties: any = [];




  constructor(private router: Router, private metroLineService: MetrolineService, private graduteProgramService: GraduateProgramService,
    private localStorageService: LocalStorageService) { }

  async ngOnInit(): Promise<void> {

    this.al = this.localStorageService.getCurrentLine();

    this.lines = this.metroLineService.getLines();
    console.log('lijnen', this.lines)
    this.faculties = this.localStorageService.getFaculties();
    console.log('faculties', this.faculties)

    this.activeline = this.lines[this.al]
    console.log('al', this.activeline)
    this.stations = this.lines[this.al].stations
    console.log(this.stations)

    console.log
    for (let i = 0; i < this.lines[this.al].stations.length; i++) {
      let tempOp = this.lines[this.al].stations[i];
      if (tempOp.graduateProgramId != null) {
        this.graduatePrograms.push(tempOp)
      }

    }
    console.log('opl', this.graduatePrograms)
  }

  changeLine(id: number): void {
    this.localStorageService.setCurrentLine(id)
    console.log(id);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.ngOnInit();

    console.log('click')
  }

  goToForm(graduateProgramId: number) {
    console.log('Going to form with id: ' + graduateProgramId);
    this.localStorageService.setActiveStationId(graduateProgramId);
    this.router.navigateByUrl("/form")
  }
}

