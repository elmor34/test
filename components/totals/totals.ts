// src/app/totals/totals.ts
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { Data, ConsumptionReading } from '../../services/data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.html',
  styleUrl: './totals.scss',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, ChartModule],
})
export class Totals implements OnInit, OnDestroy {

  dailyChartData: any;
  monthlyChartData: any;
  yearlyChartData: any;
  chartOptions: any;
  dailyReadings: ConsumptionReading[] = [];
  monthlyReadings: ConsumptionReading[] = [];
  yearlyReadings: ConsumptionReading[] = [];
  private subscription!: Subscription;

  constructor(private data: Data, private cdr: ChangeDetectorRef) {}



  ngOnInit() {
    this.subscription = this.data.getConsumptionData().subscribe({
      next: (data) => {
        this.dailyReadings = data[0].readings;
        this.monthlyReadings = data[1].readings;
        this.yearlyReadings = data[2].readings;
        this.dailyChartData = this.transformToChartData(this.dailyReadings, 'Daily Consumption', 'daily', '#42A5F5');
        this.monthlyChartData = this.transformToChartData(this.monthlyReadings, 'Monthly Consumption', 'monthly', '#66BB6A');
        this.yearlyChartData = this.transformToChartData(this.yearlyReadings, 'Yearly Consumption', 'yearly', '#FFA726');
        console.log('Consumption data loaded successfully:', data);
        // Manually trigger change detection because the app is zoneless
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching consumption data:', err);
      }
    });
    this.chartOptions = {

      plugins: {
        legend: {
          display: false // Hide legend as the card title is enough
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };

  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  private transformToChartData(readings: ConsumptionReading[], label: string, period: 'daily' | 'monthly' | 'yearly', color: string): any {
    const labels = readings.map(r => this.formatDate(r.readingDate, period));
    const data = readings.map(r => r.value);

    return {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: `${color}40`, // Add alpha for fill
          borderColor: color,
          borderWidth: 1
        }
      ]
    };
  }

  private formatDate(dateString: string, period: 'daily' | 'monthly' | 'yearly'): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {};

    switch (period) {
      case 'daily':
        options.month = 'short';
        options.day = 'numeric';
        break;
      case 'monthly':
        options.month = 'long';
        break;
      case 'yearly':
        options.year = 'numeric';
        break;
    }
    return date.toLocaleDateString(undefined, options);
  }

}
