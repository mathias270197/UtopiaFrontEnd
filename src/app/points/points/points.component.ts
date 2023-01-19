import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage/local-storage.service';
import { Person } from 'src/app/login/person';
import { PointsService } from '../points.service';


@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit {
  points: number | undefined;
  username: string = '';

  constructor(private router: Router, private pointsService: PointsService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.points = this.pointsService.getPoints();
    this.username = this.localStorageService.getCurrentUserName()!;
  }

}
