import {Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { StatisticsService } from '../../../shared/services/statistics.service';
import {ChartDataLocal, StatisticsDataType} from '../../../../types/statistics-data.type';
import {DefaultResponseType} from "../../../../types/default-response.type";
import {Chart} from "chart.js/auto";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges {
  chartData: ChartDataLocal = { x: [''], y: { visitors: [0], reloads: [0] } };

  @ViewChild('lineChart', { static: true }) private chartRef: ElementRef<HTMLCanvasElement> | undefined;

  private chart: Chart | undefined;

  totalVisitor: number = 0;
  totalRefreshes: number = 0;
  lineData: any = {
    labels: [''], // Initial labels
    datasets: [
      {
        data: [0], // Initial data for Visitors
        label: 'Visitors',
        borderColor: '#242764'
      },
      {
        data: [0], // Initial data for Page Reloads
        label: 'Page Reloads',
        fill: true,
        borderColor: '#242764'
      }
    ]
  };
  notFirstTime: boolean = false;
  clicked: boolean = false;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.getData('week');
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  getData(filter: string): void {
    this.statisticsService.getStatisticsData(filter)
      .subscribe({
        next: (response: DefaultResponseType | StatisticsDataType) => {
          if((response as DefaultResponseType).success === 0) {
            throw new Error((response as DefaultResponseType).message)
          }
          this.chartData.x = (response as StatisticsDataType).pageReloads.x;
          console.log(this.chartData.x);
          this.chartData.y.visitors = (response as StatisticsDataType).visitors.y;
          this.chartData.y.reloads = (response as StatisticsDataType).pageReloads.y;
          this.totalVisitor = (response as StatisticsDataType).visitorsCount;
          this.totalRefreshes = (response as StatisticsDataType).pageReloadsCount;
          this.createChart();
          this.notFirstTime = true;

        },
        error: (error) => {
          console.error('Error fetching statistics data:', error);
          // Handle error as needed
        }
      });
  }

  private createChart() {
    if(!this.notFirstTime) {
      if (this.chartRef) {
        this.chart = new Chart(this.chartRef.nativeElement, {
          type: 'line',
          data: {
            labels: this.chartData.x,
            datasets: [
              {
                data: this.chartData.y.visitors,
                label: 'Visitors',
                borderColor: '#242764',


                fill: true,
                pointBackgroundColor: '#242764',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#242764'
              },
              {
                data: this.chartData.y.reloads,
                label: 'Page Reloads',
                borderColor: '#FF5733',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#FF5733',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#FF5733'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
      }
    } else {
      if(this.chart && this.chart.data && this.chart.data.datasets) {
        this.chart.destroy();
        this.chart = new Chart((this.chartRef as ElementRef<HTMLCanvasElement>).nativeElement, {
          type: 'line',
          data: {
            labels: this.chartData.x,
            datasets: [
              {
                data: this.chartData.y.visitors,
                label: 'Visitors',
                borderColor: '#242764',


                fill: true,
                pointBackgroundColor: '#242764',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#242764'
              },
              {
                data: this.chartData.y.reloads,
                label: 'Page Reloads',
                borderColor: '#FF5733',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#FF5733',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#FF5733'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        })
      }
    }
  }
  onBtnClick() {
    this.clicked = true;
    setTimeout(() => {
      this.clicked = false;
    }, 100);
  }
  private updateChart() {
    if (this.chart) {
      this.chart.data.labels = this.chartData.x;
      this.chart.data.datasets[0].data = this.chartData.y.visitors;
      this.chart.data.datasets[1].data = this.chartData.y.reloads;
      this.chart.update();
    }
  }
}
