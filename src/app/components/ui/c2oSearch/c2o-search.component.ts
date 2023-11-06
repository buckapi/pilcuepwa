import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Butler } from '@app/services/butler.service';
import { DataApiService } from '@app/services/data-api.service';
import { Yeoman } from '@app/services/yeoman.service';

import { HttpClient } from  '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-c2o-search',
  templateUrl: './c2o-search.component.html',
  styleUrls: ['./c2o-search.component.css']
})
export class C2oSearchComponent implements OnInit {
  searchTerm: string = '';
  results:any= [];
  // searchResults$: Observable<any>;
  constructor(
    public router:Router,
    public yeoman:Yeoman,
    public _butler:Butler,
    private http: HttpClient,
    public dataApiService:DataApiService
      ) { 

        
      }
set(view:any){
  this.yeoman.view=view;
}

onSearch2() {
  console.log("hola, "+this._butler.searchTerm);
  this._butler.nameFiltering=true;
  // Agrega aquí la lógica que deseas ejecutar cuando el usuario escriba en el input
}
  ngOnInit(): void {
  }

}
