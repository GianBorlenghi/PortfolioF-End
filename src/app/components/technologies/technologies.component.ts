import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Chart, ChartType } from 'chart.js';
import { Technology } from 'src/app/models/technology';
import { AuthService } from 'src/app/service/auth.service';
import { TechnologyService } from 'src/app/service/technology.service';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent implements OnInit {

  technology:Technology[] = [];
  techDelete:any = "";
  chart:Chart;
  level:any = [];
  techName:any = [];
  error: any = null;
  constructor(private route:Router,private service:TechnologyService,private authServ:AuthService) { }

  ngOnInit() {
    this.service.id = localStorage.getItem('id');
    this.getTech(this.service.id); 
   }

   

  public getTech(id:any):void{
    this.service.getTechnology().subscribe(
      data=> {this.technology = data
      console.log(data);

      data.map(o=>{
        this.level.push(o.level),
        this.techName.push(o.nameTechnology)}) 
        this.graph();
        },(err:any)=>{
          this.error = err.error.message;
        })
    }
  public getRol():boolean{
    return this.authServ.isAdmin();
  }

  

  public deleteTech(id:any){
    this.service.deleteTechnology(id).subscribe(
      (data:any)=>{
       console.log(data);
       this.route.navigate(['']);
      }
     )
  }

  public graph(){
    for(let item of this.technology){
    var graf = document.getElementById('grafica') as HTMLCanvasElement;
        
        const myPieChart = new Chart(graf,{
            type:'doughnut',
            data:{
              labels:[item.nameTechnology],
                datasets :[{
                  label:'Pedro pepepeppepepepeppeeppepepeopopop',
                    data:[70,30],
                    backgroundColor:['#35a','#000']
                }]
            }
                });
                myPieChart.destroy();
              }
  }
  

}
