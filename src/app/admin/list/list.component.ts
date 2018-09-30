import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private products = [];
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.api.allProducts().subscribe((result: any) => {
      this.products = result.products;
    });
  }

  onDelete(productId) {
    this.api.deleteProduct(productId).subscribe(success => {
      this.loadProducts();
    });
  }

}
