import { Component, Input, SimpleChanges } from '@angular/core';
import { HeatmapDataService } from '../services/heatmap-data.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

interface EventData {
  timestamp: string; // ISO string date format
  intensity: number; // Numeric value representing the intensity of the event
}


@Component({
  selector: 'app-heatmap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.css'
})
export class HeatmapComponent {
  @Input() eventData: EventData[] = [];
  grid: { date: string, intensity: number, color: string }[] = [];
  colorScale: string[] = ['#ffffff', '#ffffcc', '#ffeb66', '#ffcc00', '#ff9900', '#ff6600', '#ff0000']; // Example gradient color scale
  private dataSubscription!: Subscription;

  constructor(private HeatmapService: HeatmapDataService){

  }
  ngOnInit(){
    this.dataSubscription = this.HeatmapService.heatMapSubject.subscribe(data => {
      console.log("data", data);
      
      this.updateGrid();
    });


  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventData']) {
      this.updateGrid();
    }
  }

  private updateGrid(): void {
    // Group events by date and calculate intensity
    const intensityMap = this.processEventData(this.eventData);
    console.log("intensityMap", intensityMap);
    
    // Prepare data here 
    console.log("Object.keys(intensityMap)", Object.keys(intensityMap)); //make array of date only  
    
    this.grid = Object.keys(intensityMap).map(date => ({
      date,
      intensity: intensityMap[date],
      color: this.getColor(intensityMap[date])
    }));
    console.log("grid", this.grid);
  }

  private processEventData(eventData: EventData[]) {
    const intensityMap: any = {};

    eventData.forEach(event => {
      const date = event.timestamp.split('T')[0]; // Extract YYYY-MM-DD from ISO string 
      if (intensityMap[date] === undefined) {
        intensityMap[date] = 0;
      }
      intensityMap[date] += event.intensity; // Added Same date intensity 
    });

    return intensityMap;
  }

  private getColor(intensity: number) {
    const maxIntensity = 100; //  maximum intensity
    const ratio = Math.min(intensity / maxIntensity, 1); 
    const colorIndex = Math.floor(ratio * (this.colorScale.length - 1)); 
    console.log("this.colorScale[colorIndex]", this.colorScale[colorIndex]);
    
    return this.colorScale[colorIndex];
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }


}
