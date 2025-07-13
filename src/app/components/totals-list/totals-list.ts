// src/app/components/totals-list/totals-list.ts
// v1.0.0
// This file is part of the TotalsList component, which fetches and displays daily,
// monthly, and yearly consumption totals using the SocketService.
import { Component, OnInit, signal, computed } from '@angular/core';
import { SocketService } from '../../services/socket-service';
import { DecimalPipe, DatePipe } from '@angular/common'; // For | number and | date in template
import { Card } from 'primeng/card'; // For p-card
import { TableModule } from 'primeng/table'; // For p-table

@Component({
  selector: 'totals-list',
  standalone: true,
  providers: [SocketService],
  imports: [DecimalPipe, DatePipe, Card, TableModule],
  templateUrl: './totals-list.html',
  styleUrl: './totals-list.scss'
})
export class TotalsList implements OnInit {
  dailyTotals = signal<any[]>([]);
  monthlyTotals = signal<any[]>([]);
  yearlyTotals = signal<any[]>([]);

  utility = 'DEFAULT_ACCOUNT';
  meterId = 4278423033;
  customerName = 'Gökhan Aykan';

  // Computed signal for monthly table data (sorted descending: latest first)
  monthlyTableData = computed(() => {
    const totals = this.monthlyTotals().slice().sort((a, b) => {
      const fullYearA = 2000 + parseInt(a.year, 10);
      const fullYearB = 2000 + parseInt(b.year, 10);
      const dateA = new Date(fullYearA, a.month - 1, 1);
      const dateB = new Date(fullYearB, b.month - 1, 1);
      return dateB.getTime() - dateA.getTime(); // Descending order
    });

    return totals.map((item) => {
      const fullYear = 2000 + parseInt(item.year, 10);
      const monthName = new Date(fullYear, item.month - 1, 1).toLocaleString('default', { month: 'long' });

      return {
        year: fullYear,
        month: monthName,
        consumed_m3: item.consumed_m3
      };
    });
  });

  // Computed signal for today's consumption (match on year, month, day)
  todayConsumption = computed(() => {
    const now = new Date();
    const currentYear = (now.getFullYear() - 2000).toString().padStart(2, '0'); // e.g., '25'
    const currentMonth = now.getMonth() + 1; // 1-12
    const currentDay = now.getDate(); // 1-31

    return this.dailyTotals().find(entry => {
      return entry.year === currentYear &&
             entry.month === currentMonth &&
             entry.day === currentDay;
    }) || null;
  });

  // Computed signal for this month's consumption (latest monthly entry)
  thisMonthConsumption = computed(() => {
    if (this.monthlyTotals().length > 0) {
      const latestMonth = this.monthlyTotals().sort((a, b) => {
        const fullYearA = 2000 + parseInt(a.year, 10);
        const fullYearB = 2000 + parseInt(b.year, 10);
        const dateA = new Date(fullYearA, a.month - 1, 1);
        const dateB = new Date(fullYearB, b.month - 1, 1);
        return dateB.getTime() - dateA.getTime(); // Latest first
      })[0];
      return latestMonth;
    }
    return null;
  });

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    console.log('ngOnInit ====> TotalsList');
    this.getMyMeterTotals(this.utility, this.meterId);
  }

  getMyMeterTotals(utility: string, meterId: number) {
    this.socketService.getMyMeterTotals(utility, meterId).subscribe((data: { daily_totals: any[]; monthly_totals: any[]; yearly_totals: any[]; }) => {
      this.dailyTotals.set(data.daily_totals);
      console.log('Daily Totals raw data:', data.daily_totals); // Log to check structure
      console.log('Computed todayConsumption:', this.todayConsumption()); // Log to check calculation
      this.monthlyTotals.set(data.monthly_totals);
      console.log('Monthly Totals:', data.monthly_totals);
      this.yearlyTotals.set(data.yearly_totals);
      console.log('Yearly Totals:', data.yearly_totals);
    });
  }
}
