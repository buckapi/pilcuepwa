import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from '@app/services/data-api.service';
import { Yeoman } from '@app/services/yeoman.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  categories:any;
  constructor(
    public router: Router,
    public yeoman: Yeoman,
    private dataApi: DataApiService
  ) { 
    this.loadCategories();
  }
  loadCategories(){
    this.dataApi.getAllCategory().subscribe(response=>{
      this.categories=response;
    });
  }

  ngOnInit(): void {
  }

}
