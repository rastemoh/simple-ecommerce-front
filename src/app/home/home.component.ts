import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private products = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.allProducts().subscribe((result: any) => {
      this.products = result.products;
    });
  }

}
