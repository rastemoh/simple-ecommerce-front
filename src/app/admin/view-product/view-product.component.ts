import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { CommonService } from '../../shared/common.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  private product = null;
  private productId;
  variantForm = new FormGroup({
    color: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });
  constructor(private route: ActivatedRoute, private api: ApiService, private common: CommonService) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.loadProduct();
  }

  loadProduct() {
    this.api.loadAProduct(this.productId).subscribe((result: any) => {
      this.product = result.product;
    });
  }

  onSubmitVariant() {
    const formData = this.variantForm.value;
    this.api.addVariant(this.productId, formData.color, formData.price).subscribe(() => {
      this.loadProduct();
      this.variantForm.reset();
    });
  }

  onDelete(productId) {
    this.api.deleteProduct(productId).subscribe(() => {
      this.common.navigateToLink('/home');
    });
  }

  onDeleteVariant(variantId) {
    this.api.deleteVariant(variantId).subscribe(() => {
      this.loadProduct();
    });
  }
}
