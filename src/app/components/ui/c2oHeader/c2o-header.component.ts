import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRESTService } from '@app/services/authREST.service';
import { Yeoman } from '@app/services/yeoman.service';

@Component({
  selector: 'app-c2o-header',
  templateUrl: './c2o-header.component.html',
  styleUrls: ['./c2o-header.component.css']
})
export class C2oHeaderComponent implements OnInit {

  constructor(
    public router:Router,
    public yeoman:Yeoman,
    public authRESTService:AuthRESTService
  ) {
    this.yeoman.user=this.authRESTService.getCurrentUser();

   }

  ngOnInit(): void {
  }

}
