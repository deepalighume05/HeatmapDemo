import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeatmapDataService {
heatMapSubject =  new Subject<any>();
  constructor() { }

// not used this Service in application  

}
