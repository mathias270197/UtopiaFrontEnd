import { Injectable } from '@angular/core';
import { getMaxListeners } from 'process';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MetrolineService {
lines:any;
  constructor(private localStorageService: LocalStorageService) { }
  getLines() {
   return this.localStorageService.getLines();

  };
   }

