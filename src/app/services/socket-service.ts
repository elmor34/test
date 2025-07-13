// src/app/services/socketdata.service.ts
// v1..0.0
// This service fetches and caches daily, monthly, and yearly consumption totals.
// It first checks localStorage for cached data and falls back to fetching from assets if not found
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private dailyKey = 'metering_totals_daily';
  private monthlyKey = 'metering_totals_monthly';
  private yearlyKey = 'metering_totals_yearly';

  constructor(private http: HttpClient) {


  }

  // private getOrLoadData(key: string, assetPath: string): Observable<any[]> {
  //   const storedData = localStorage.getItem(key);
  //   console.log('key : ', key);
  //   if (storedData) {
  //     console.log(`Data loaded from localStorage for ${key}`);
  //     return of(JSON.parse(storedData));
  //   } else {
  //     console.log(`Loading starter data from assets for ${key}`);
  //     return this.http.get<any[]>(`assets/data/${assetPath}`).pipe(
  //       tap(data => {
  //         localStorage.setItem(key, JSON.stringify(data));
  //         console.log(`Starter data saved to localStorage for ${key}`);
  //       })
  //     );
  //   }
  // }

  // getDailyTotals(): Observable<any[]> {
  //   return this.getOrLoadData(this.dailyKey, 'metering.totals_daily.json');
  // }

  // getMonthlyTotals(): Observable<any[]> {
  //   return this.getOrLoadData(this.monthlyKey, 'metering.totals_monthly.json');
  // }

  // getYearlyTotals(): Observable<any[]> {
  //   return this.getOrLoadData(this.yearlyKey, 'metering.totals_yearly.json');
  // }

  getMyMeterTotals(utility: string, meterId: number): Observable<{ daily_totals: any[]; monthly_totals: any[]; yearly_totals: any[]; }> {
    const storageKey = `meter_totals_${utility}_${meterId}`;
    const storedData = localStorage.getItem(storageKey);

    console.log(`getMyMeterTotals ====> SocketService: ${storageKey}`);

    if (storedData) {
      console.log(`Totals loaded from localStorage for ${storageKey}`);
      return of(JSON.parse(storedData));
    } else {
      console.log(`Fetching totals from server for ${storageKey}`);
      return new Observable(observer => {
        const socket = io('http://localhost:5005');
        socket.on('connect', () => {
          socket.emit('get_metering_totals', { utility, meter_number: meterId });
        });

        socket.on('meter_totals', (data) => {
          localStorage.setItem(storageKey, JSON.stringify(data));
          console.log(`Totals saved to localStorage for ${storageKey}`);
          observer.next(data);
          observer.complete();
          socket.disconnect();
        });

        socket.on('error', (err) => {
          observer.error(err);
          socket.disconnect();
        });
      });
    }
  }

}
