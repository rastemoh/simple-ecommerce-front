import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Location } from '@angular/common';
import { CommonService } from '../../shared/common.service';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  productForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    variants: new FormArray([])
  });
  get variants(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }
  constructor(private api: ApiService, public location: Location, private common: CommonService) { }

  ngOnInit() {
  }

  addVariant() {
    this.variants.push(new FormGroup({
      color: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    }));
  }

  removeAVariant(index: number) {
    this.variants.removeAt(index);
  }

  onSubmit() {
    const data = this.productForm.value;
    this.api.addProduct(data.title, data.description, data.variants).subscribe(
      () => {
        this.common.navigateToLink('/admin');
      }
    );
  }
}
