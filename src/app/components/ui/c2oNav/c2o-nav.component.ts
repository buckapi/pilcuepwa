import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Yeoman } from '@app/services/yeoman.service';

@Component({
  selector: 'app-c2o-nav',
  templateUrl: './c2o-nav.component.html',
  styleUrls: ['./c2o-nav.component.css']
})
export class C2oNavComponent implements OnInit {

  constructor(public router:Router,public yeoman:Yeoman) { }

  ngOnInit(): void {
  }

}
