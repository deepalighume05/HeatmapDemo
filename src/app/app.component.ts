import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { HeatmapDataService } from './services/heatmap-data.service';
interface EventData {
  timestamp: string;
  intensity: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeatmapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  eventData: EventData[] = [
    { timestamp: '2024-07-01T08:00:00Z', intensity: 10 },
    { timestamp: '2024-07-01T08:00:00Z', intensity: 2 },
    { timestamp: '2024-07-02T16:00:00Z', intensity: 25 },
    { timestamp: '2024-07-03T08:00:00Z', intensity: 35 },
    { timestamp: '2024-07-04T08:00:00Z', intensity: 50 },
    { timestamp: '2024-07-05T08:00:00Z', intensity: 65 },
    { timestamp: '2024-07-06T08:00:00Z', intensity: 70 },
    { timestamp: '2024-07-07T08:00:00Z', intensity: 85 },
    { timestamp: '2024-07-08T08:00:00Z', intensity: 100 },

    // Added sample data
  ];

  constructor(private dataService: HeatmapDataService){}
  
  ngOnInit(){
    // this.dataService.heatMapSubject.next(this.eventData); for Service send data 
  }
}
