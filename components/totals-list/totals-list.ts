import { Component, OnInit, signal } from '@angular/core';
import { SocketService } from '../../services/socket-service';
import { JsonPipe } from '@angular/common'; // For | json in template

@Component({
  selector: 'totals-list',
  standalone: true,
  providers: [SocketService],
  imports: [JsonPipe],
  templateUrl: './totals-list.html',
  styleUrl: './totals-list.scss'
})
export class TotalsList implements OnInit {
  dailyTotals = signal<any[]>([]);
  monthlyTotals = signal<any[]>([]);
  yearlyTotals = signal<any[]>([]);

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    console.log('ngOnInit ====> TotalsList');
    this.socketService.getDailyTotals().subscribe(data => {
      this.dailyTotals.set(data); // Update signal
      console.log('Daily Totals:', data);
    });

    this.socketService.getMonthlyTotals().subscribe(data => {
      this.monthlyTotals.set(data);
      console.log('Monthly Totals:', data);
    });

    this.socketService.getYearlyTotals().subscribe(data => {
      this.yearlyTotals.set(data);
      console.log('Yearly Totals:', data);
    });
  }

}
