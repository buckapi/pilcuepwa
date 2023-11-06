import { Component, OnInit } from '@angular/core';
import { Butler } from '@app/services/butler.service';
import { DataApiService } from '@app/services/data-api.service';
import { Yeoman } from '@app/services/yeoman.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(   public _butler:Butler,public dataApiService: DataApiService, public yeoman:Yeoman ) { 
 
  }
  setRoute(route:any){
    this._butler.virtualRoute=route;
    this.dataApiService.getAllProducts().subscribe(response =>{
      this.yeoman.products=response
    });
  }
  ngOnInit(): void {
  }

}
