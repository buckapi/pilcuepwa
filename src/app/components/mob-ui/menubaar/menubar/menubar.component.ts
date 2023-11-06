import { ChangeDetectorRef, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Yeoman } from '@app/services/yeoman.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MobHomeComponent } from '@app/components/mob-home/mob-home.component';
import { MobAddOrderComponent } from '@app/components/mob-addOrder/mob-add-order.component';
import { States } from '@app/services/states.service';
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  @ViewChild('addIcon', { static: false }) addIconRef!: ElementRef;
  currentUser: any;
  constructor(
    public states: States,
    public mobhomeComponent: MobHomeComponent,
    public mobAddOrderComponent: MobAddOrderComponent,
    public router: Router, public yeoman: Yeoman,
    public cdr: ChangeDetectorRef,
    private ngxService: NgxUiLoaderService) {

  }
  ngOnInit(): void {

    console.log("valores: lA - cC : [" + this.yeoman.loadingAdd + "] [" + this.yeoman.catalogoCargado + "]")
  }
  esAdmin(): boolean {
    return this.currentUser && this.currentUser.type === 'admin';
  }
  esClient(): boolean {
    return this.currentUser && this.currentUser.type === 'client';
  }
  esDist(): boolean {
    return this.currentUser && this.currentUser.type === 'dist';
  }
  goAddOrder() {
    this.yeoman.loadingAdd = true;
    this.yeoman.catalogoCargado = true;
    console.log('loading cambiado: ' + this.yeoman.loadingAdd);
    this.okLetsGo();
  }
  okLetsGo() {
    this.router.navigate(['/mobAddOrder']);
  }
}
