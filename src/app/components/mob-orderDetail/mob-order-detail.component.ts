import { Component, OnInit, Renderer2, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from '@app/services/data-api.service';
import { Yeoman } from '@app/services/yeoman.service';
import * as $ from 'jquery';

import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale'; 
@Component({
  selector: 'app-mob-order-detail',
  templateUrl: './mob-order-detail.component.html',
  styleUrls: ['./mob-order-detail.component.css']
})
export class MobOrderDetailComponent implements OnInit {
  order: any;
  constructor(
    private cdr: ChangeDetectorRef,
    public yeoman: Yeoman,
    public dataApiService: DataApiService,
    public router: Router
  ) {
    if (this.yeoman.previewOrder !== undefined) {
      console.log("order:" + JSON.stringify(this.yeoman.previewOrder));
      if (this.yeoman.previewOrder !== undefined) {
        console.log("order:" + JSON.stringify(this.yeoman.previewOrder));
        this.order = JSON.stringify(this.yeoman.previewOrder);
      }
    }
  }
  formatDateRelative(createdAt: string): string {
    const date = new Date(createdAt);
    return formatDistanceToNow(date, { addSuffix: true, locale: es }); // Usa la localización en español
  }
  ngOnInit(): void {
  }
}
