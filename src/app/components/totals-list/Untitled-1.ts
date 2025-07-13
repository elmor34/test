import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, tap } from 'rxjs';

export interface ConsumptionData {
  readings: ConsumptionReading[];
}

export interface ConsumptionReading {
  readingDate: string;
  value: number;
}

@Injectable({
  providedIn: 'root',
})
export class Data {
  constructor(private http: HttpClient) {}

  /**
   * Fetches consumption data for daily, monthly, and yearly readings.
   * @returns An observable that emits an array of ConsumptionData objects.
   */
  getConsumptionData(): Observable<
    [ConsumptionData, ConsumptionData, ConsumptionData]
  > {
    // const daily$ = this.http.get<ConsumptionData>('assets/data/metering.totals_daily.json');
    const daily$ = this.http
      .get<ConsumptionData>('assets/data/metering.totals_daily.json')
      .pipe(
        // Use the 'tap' operator for side-effects like logging, without altering the stream.
        tap((data) => console.log('Daily data fetched in service:', data))
      );
    const monthly$ = this.http
      .get<ConsumptionData>('assets/data/metering.totals_monthly.json')
      .pipe(
        // Use the 'tap' operator for side-effects like logging, without altering the stream.
        tap((data) => console.log('Monthly data fetched in service:', data))
      );
    const yearly$ = this.http
      .get<ConsumptionData>('assets/data/metering.totals_yearly.json')
      .pipe(
        // Use the 'tap' operator for side-effects like logging, without altering the stream.
        tap((data) => console.log('Yearly data fetched in service:', data))
      );


    return forkJoin([daily$, monthly$, yearly$]);
  }
}
