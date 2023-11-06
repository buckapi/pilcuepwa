import { Component, OnInit } from '@angular/core';
import { CLIENTS } from '@app/services/clients.service';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css']
})
export class SubheaderComponent implements OnInit {
clients:any;
  constructor() { this.clients=CLIENTS}

  ngOnInit(): void {
  }

}
