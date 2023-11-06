import { Component, OnInit } from '@angular/core';
import { Butler } from '@app/services/butler.service';
@Component({
  selector: 'app-navsmall',
  templateUrl: './navsmall.component.html',
  styleUrls: ['./navsmall.component.css']
})
export class NavsmallComponent implements OnInit {

  constructor(   public _butler:Butler) { 
 
  }
setRoute(route:any){
  this._butler.virtualRoute=route;
}
  ngOnInit(): void {
  }

}
