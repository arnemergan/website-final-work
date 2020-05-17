import { Component, OnInit } from '@angular/core';
import { Statistics } from './../../../api/models/models';
import { StatisticsService } from './../../../api/statistics.service';
import { AuthService } from './../../../api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  graph = [];
  graph2 = [];
  
  view: any[] = [700, 300];

  // options invoices
  legend: boolean = false;
  showLabels: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Month';
  yAxisLabel: string = 'Quantity';
  timeline: boolean = true;

  // options invoices
  legend2: boolean = false;
  showLabels2: boolean = false;
  animations2: boolean = true;
  xAxis2: boolean = true;
  yAxis2: boolean = true;
  showYAxisLabel2: boolean = true;
  showXAxisLabel2: boolean = true;
  xAxisLabel2: string = 'Month';
  yAxisLabel2: string = 'Money';
  timeline2: boolean = true;

  procent2:Number;

  procent:Number;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  months =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  model: Statistics;

  constructor(private router: Router,private statisticService:StatisticsService,public auth: AuthService) {
   }

  ngOnInit(): void {
    /*this.statisticService.getStats().subscribe(
      data => this.add(data)
    );*/
  }

  add(data){
    this.model = data;
    this.procent = ((this.model.currentMonth.total - this.model.beforeCurrentMonth1.total)/this.model.beforeCurrentMonth1.total)*100;
    this.procent2 = ((this.model.currentMonth.totalPrice - this.model.beforeCurrentMonth1.totalPrice)/this.model.beforeCurrentMonth1.totalPrice)*100;
    this.graph2 = [
      {
        "name": "Costs",
        "series": [
          {
            "name": this.months[(new Date().getMonth() - 2)],
            "value": this.model.beforeCurrentMonth2.totalPrice
          },
          {
            "name": this.months[(new Date().getMonth() - 1)],
            "value": this.model.beforeCurrentMonth1.totalPrice
          },
          {
            "name": this.months[(new Date().getMonth())],
            "value": this.model.currentMonth.totalPrice
          }
        ]
      }
    ];
    this.graph = [
    {
      "name": "Invoices",
      "series": [
        {
          "name": this.months[(new Date().getMonth() - 2)],
          "value": this.model.beforeCurrentMonth2.total
        },
        {
          "name": this.months[(new Date().getMonth() - 1)],
          "value": this.model.beforeCurrentMonth1.total
        },
        {
          "name": this.months[(new Date().getMonth())],
          "value": this.model.currentMonth.total
        }
      ]
    }
    ];
  }
  toStatistics(){
    this.router.navigate(['statistics']);
  }

  toHome(){
    this.router.navigate(['dashboard']);
  }
}
