import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any = {};
  constructor(private activatedRoute: ActivatedRoute, private http: Http) { }

  async ngOnInit() {
this.activatedRoute.params.subscribe((a) => {
  this.data = a;
});
  }

  
}
