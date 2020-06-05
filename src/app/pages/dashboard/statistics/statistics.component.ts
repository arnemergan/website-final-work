import { Component, OnInit } from '@angular/core';
import { Statistics, Category } from './../../../api/models/models';
import { StatisticsService } from './../../../api/statistics.service';
import { AuthService } from './../../../api/auth.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../../api/category.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  graph = [];
  graph2 = [];
  
  view: any[] = [700, 300];

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
  selectedCategory = 'default';
  username = '';

  options: Category[] = [];
  visibleForAdmin: boolean = false;

  constructor(private router: Router,private statisticService:StatisticsService,public auth: AuthService, public categoryService: CategoryService) {
   }

  ngOnInit(): void {
    this.visibleForAdmin = this.auth.hasPermission({authority: "ROLE_ADMIN"});
    this.getStats();
    this.getCategories();
  }

  changedCategory(value) :void{
    this.getStatsOnCategory(value);
  }

  changedUsername() :void{
    this.getStatsOnUserName(this.username);
  }

  
  changeAll(): void {
    this.getStats();
  }

  add(data){
    this.model = data;
    this.procent = Math.round(((this.model.currentMonth.total - this.model.beforeCurrentMonth1.total)/this.model.beforeCurrentMonth1.total)*100);
    this.procent2 = Math.round(((this.model.currentMonth.totalPrice - this.model.beforeCurrentMonth1.totalPrice)/this.model.beforeCurrentMonth1.totalPrice)*100);
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

  private getStats(){
    this.statisticService.getStats().subscribe(
      data => this.add(data)
    );
  }

  private getStatsOnCategory(category){
    this.statisticService.getStatsOnCategory(category).subscribe(
      data => this.add(data)
    );
  }

  private getStatsOnUserName(username){
    this.statisticService.getStatsOnUsername(username).subscribe(
      data => this.add(data)
    );
  }

  private getCategories(){
    this.categoryService.getAll().subscribe((categories:Array<Category>) => {
      this.options = categories;
    });
  }
}
